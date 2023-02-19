import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import {
    OnDestroyMixin,
    untilComponentDestroyed,
} from '@berlingoqc/ngx-common';
import { NotificationService } from '@berlingoqc/ngx-notification';
import { BaseDashboardComponent } from '@growbe2/growbe-dashboard';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import {
    getAlarmPropertie,
    getCyclePropertie,
    transformRelayTimeToString,
} from '../../form/relay-form';
import {RelayHistoricComponent} from '../relay-historic/relay-historic.component';

export interface RelayControl {
    getConfig(): Observable<any>; // RelayOutletConfig
    getValue(): Observable<any>; // RelayOutletData
    getParentConnectionStatus(): Observable<boolean>;
    changeManualState(config: any): Observable<void>; // RelayOutletConfig

    //getValues(): Observable<[any, any, any, boolean]>;
    //refresh: () => void;
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
    extends OnDestroyMixin(BaseDashboardComponent)
    implements OnInit {
    @Input() control: RelayControl;
    @Input() moduleId: string;
    @Input() property: string;
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
        private notificationService: NotificationService,
        private matDialog: MatDialog,
    ) {
        super();
    }

    async ngOnInit() {
        // faut que j'aille chercher la config et l'etat de cette propriétés
        if (!this.control) {
            console.error(`failed to initialize relay-unit-control missing control`);
            return;
        }

        this.control.getConfig()
          .pipe(untilComponentDestroyed(this))
          .subscribe((config) => {
              this.config = config;
              console.log('receive new config');
              if (!this.pendingConfig) {
                  this.pendingConfig = { ...this.config };

                  if (this.pendingConfig?.mode) {
                      this.setForm();
                   }
              }
          });

        this.control.getValue()
          .pipe(untilComponentDestroyed(this))
          .subscribe((value) => {
              this.value = value;
              console.log('value', this.value);
          });

        this.control.getParentConnectionStatus()
          .pipe(untilComponentDestroyed(this))
          .subscribe((connected) => {
              this.connected = connected;
              this.subjectModuleState.next(this.connected);
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
                },
                (error) => {
                    // return the state of the slide to the previous one
                },
            );
    }

    showHistoricDialog() {
      this.matDialog.open(RelayHistoricComponent, {
        data: {
          moduleId: this.moduleId,
          property: this.property,
        },
      });
    }

    private setForm() {
        console.log('PENDING CONFIG CURRENT', this.pendingConfig);
        if (this.pendingConfig?.mode === 3 || this.pendingConfig?.mode === "CYCLE" || this.pendingConfig?.cycle !== undefined) {
            this.formConfigProperty = {
                type: 'simple',
                items: [getCyclePropertie()],
                actionsButtons: this.getActionButtons(),
                event: this.getFormEvent(this.pendingConfig.mode),
            };
        } else if (this.pendingConfig?.mode === 1 || this.pendingConfig?.mode === "ALARM" || this.pendingConfig?.alarm !== undefined) {
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
                                    hour: (+config.alarm.begining.split(':')[0]) || 0,
                                    minute: (+config.alarm.begining.split(
                                        ':',
                                    )[1]) || 0,
                                },
                                end: {
                                    hour: (+config.alarm.end.split(':')[0]) || 0,
                                    minute: (+config.alarm.end.split(':')[1]) || 0,
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
                        //this.control.refresh();
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
        if (this.pendingConfig?.mode !== this.config?.mode) {
            if ([3, 1].includes(this.config.mode)) {
                this.notificationService.openNotification({
                    title: mapTextForMode[this.config.mode].deleted,
                    body: '',
                });
            }
        }
    }
}
