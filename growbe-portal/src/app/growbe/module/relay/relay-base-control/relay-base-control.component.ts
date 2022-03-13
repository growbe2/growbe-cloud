import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import {
    OnDestroyMixin,
    untilComponentDestroyed,
} from '@berlingoqc/ngx-common';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import {
    getAlarmPropertie,
    getCyclePropertie,
    transformRelayTimeToString,
} from '../../form/relay-form';

export interface RelayControl {
    getValues(): Observable<[any, any, any, boolean]>;
    changeManualState(config: any): Observable<void>;
    refresh: () => void;
}

export const mapTextForMode = {
    3: {
        created: 'Cycle created',
        deleted: 'Cycle has been stop'
    },
    1: {
        created: 'Alarm created',
        deleted: 'Alarm has been stop'
    }
}

@Component({
    selector: 'app-relay-base-control',
    templateUrl: './relay-base-control.component.html',
    styleUrls: ['./relay-base-control.component.scss'],
})
export class RelayBaseControlComponent
    extends OnDestroyMixin(Object)
    implements OnInit {
    @Input() control: RelayControl;
    @Input() mainboardId: string;

    previousConfig: { [id: number]: any } = {};
    pendingConfig: any;
    config: any;
    value: any;
    endingAt: any;
    connected: boolean;

    requestConfig: Subscription;

    formConfigProperty: AutoFormData;

    subjectModuleState = new Subject<boolean>();

    constructor(
        private growbeModuleAPI: GrowbeModuleAPI,
        private notificationService: NotificationService,
    ) {
        super();
    }

    async ngOnInit() {
        // faut que j'aille chercher la config et l'etat de cette propriétés
        this.control
            .getValues()
            .pipe(untilComponentDestroyed(this))
            .subscribe((value) => {
                this.config = value[0];
                this.value = value[1];
                this.endingAt = value[2];
                this.connected = value[3];

                this.subjectModuleState.next(this.connected);

                if (!this.pendingConfig) {
                    this.pendingConfig = { ...this.config };

                    if (this.pendingConfig?.mode) {
                        this.setForm();
                    }
                }
            });
    }

    onModeChange(mode: number) {
        this.previousConfig[this.pendingConfig.mode] = this.pendingConfig;
        if (mode === 0) {
            this.pendingConfig = {
                mode: 0,
                manual: { state: false },
            };
        } else if (mode === 1) {
            if (this.previousConfig[mode]) {
                this.pendingConfig = this.previousConfig[mode];
            } else {
                this.pendingConfig = {
                    mode: 1,
                    alarm: {},
                };
            }
        } else if (mode === 3) {
            if (this.previousConfig[mode]) {
                this.pendingConfig = this.previousConfig[mode];
            } else {
                this.pendingConfig = {
                    mode: 3,
                    cycle: {},
                };
            }
        }
        this.setForm();
    }

    onSlideState(change: MatSlideToggleChange) {
        this.requestConfig = this.control
            .changeManualState({ mode: 0, manual: { state: change.checked } })
            .subscribe(
                () => {
                    this.notifyRelayConfigChange();
                    this.requestConfig = null;
                    this.pendingConfig = undefined;
                    this.control.refresh();
                },
                (error) => {
                    // return the state of the slide to the previous one
                },
            );
    }

    private setForm() {
        if (this.pendingConfig?.mode === 3) {
            this.formConfigProperty = {
                type: 'simple',
                items: [getCyclePropertie()],
                actionsButtons: this.getActionButtons(),
                event: this.getFormEvent(this.pendingConfig.mode),
            };
        } else if (this.pendingConfig?.mode === 1) {
            this.formConfigProperty = {
                type: 'simple',
                items: [getAlarmPropertie()],
                actionsButtons: this.getActionButtons(),
                event: this.getFormEvent(
                    this.pendingConfig.mode,
                    (config) => {
                        return {
                            alarm: {
                                begining: {
                                    hour: +config.alarm.begining.split(':')[0],
                                    minute: +config.alarm.begining.split(
                                        ':',
                                    )[1],
                                },
                                end: {
                                    hour: +config.alarm.end.split(':')[0],
                                    minute: +config.alarm.end.split(':')[1],
                                },
                            },
                        };
                    },
                    (config) => {
                        return {
                            alarm: {
                                begining: transformRelayTimeToString(
                                    config?.alarm?.begining,
                                ),
                                end: transformRelayTimeToString(
                                    config?.alarm?.end,
                                ),
                            },
                        };
                    },
                ),
            };
        }
    }

    private getActionButtons(): AutoFormData['actionsButtons'] {
        return {
            submit: {
                title: 'Apply',
                disabled: this.subjectModuleState,
            },
        };
    }

    private getFormEvent(
        mode: number,
        map_out?: (config) => any,
        map_int?: (config) => any,
    ): AutoFormData['event'] {
        return {
            submit: (config) => {
                if (map_out) {
                    config = map_out(config);
                }
                return this.control.changeManualState({ mode, ...config }).pipe(
                    tap(() => {
                        this.notifyRelayConfigChange();
                        this.control.refresh();
                        this.config = { mode, ...config };
                        this.pendingConfig = this.config;
                    }),
                );
            },
            initialData: () => {
                return of(
                    map_int ? map_int(this.pendingConfig) : this.pendingConfig,
                );
            },
        };
    }

    private notifyRelayConfigChange() {
        // valid if i'm stop a process
        if (this.pendingConfig.mode !== this.config.mode) {
            if ([3, 1].includes(this.config.mode)) {
                this.notificationService.openNotification({
                    title: mapTextForMode[this.config.mode].deleted,
                    body: '',
                });
            }
        }
    }
}
