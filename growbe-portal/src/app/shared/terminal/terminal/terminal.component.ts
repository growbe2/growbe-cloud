import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { CRUDDataSource, Filter, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs } from '@growbe2/ngx-cloud-api';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

@Component({
    selector: 'app-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
})
@unsubscriber
export class TerminalComponent implements OnInit {
    @Input()
    growbeId: string;
    @Input()
    moduleId: string;
    @Input()
    disableSearch: boolean
    @Input()
    where: Where;

    logs: Observable<string[]>;
    searchBarForm: AutoFormData;

    private filter: Filter<GrowbeLogs> = {
        offset: 0,
        limit: 200,
        order: ['timestamp desc'],
    };

    private sub: Subscription;

    constructor(
        private eventService: GrowbeEventService,
        private mainboardAPI: GrowbeMainboardAPI,
    ) {}

    ngOnInit(): void {
        this.refreshLogs();

        this.searchBarForm = {
            type: 'simple',
            items: [
                {
                    type: 'object',
                    name: 'object',
                    decorators: {
                        class: ['frow', 'full'],
                    },
                    properties: [
                        {
                            name: 'type',
                            type: 'string',
                            decorators: {
                                component: {
                                    class: ['quarter'],
                                },
                            },
                            component: {
                                name: 'select',
                                type: 'mat',
                                noneOption: {
                                    type: 'string',
                                    content: '--',
                                },
                                options: {
                                    displayTitle: '',
                                    displayContent: (e) => e[0],
                                    options: {
                                        value: () =>
                                            of([
                                                ['Module state change','module'],
                                                ['Module config change','module_config'],
                                                ['Module Alarm Event','alarm'],
                                                ['Warning','new_warning'],
                                                ['Mainboard connection change','connection'],
                                                ['Mainboard RTC change','update_rtc'],
                                                ['Mainboard sync request','sync_request'],
                                                ['Mainboard config change','growbe_config'],
                                            ]),
                                    },
                                },
                            } as any,
                        },
                    ],
                },
            ],
            actionsButtons: {},
            event: {
                submit: () => of(),
                afterFormCreated: (fg: FormGroup) => {
                    this.sub = fg.valueChanges
                        .pipe(map((value) => ({
                          group: value.object.group,
                          type: value.object?.type?.[1]
                        })))
                        .subscribe((value) => {
                            this.where = value;
                            this.refreshLogs();
                        });
                },
            },
        };

        if (this.moduleId) return;

        this.searchBarForm.items[0].properties.splice(0, 0, {
            name: 'group',
            type: 'string',
            decorators: {
                component: {
                    class: ['quarter'],
                },
            },
            component: {
                name: 'select',
                type: 'mat',
                noneOption: {
                    type: 'string',
                    content: '--',
                },
                options: {
                    displayTitle: '',
                    displayContent: (e) => e,
                    options: {
                        value: () => of(['mainboard', 'modules']),
                    },
                },
            } as any,
        });
    }

    private refreshLogs() {
      const req = this.where ? Object.assign(this.filter, { where: this.where}): this.filter;
        this.logs = this.eventService
            .getGrowbeEventWithSource(
                this.growbeId,
                '/cloud/logs',
                (d) => JSON.parse(d),
                this.mainboardAPI.growbeLogs(this.growbeId).get(req)
            )
            .pipe(
                map((logs) =>
                    logs.map(
                        (log) =>
                            `[${log.timestamp}][${log.group}][${log.type}]${
                                log.growbeModuleId
                                    ? ' ' + log.growbeModuleId + ' '
                                    : ''
                            }${log.message}`,
                    ),
                ),
            );
    }
}
