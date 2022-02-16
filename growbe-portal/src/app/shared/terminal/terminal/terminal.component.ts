import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    AutoFormData,
    FormObject,
    IProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { CRUDDataSource, Filter, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs } from '@growbe2/ngx-cloud-api';
import { DashboardItem, DASHBOARD_ITEM_REF } from '@growbe2/growbe-dashboard';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { DatePipe } from '@angular/common';

export function getTerminalSearchForm(): IProperty[] {
    return [
        {
            name: 'group',
            type: 'string',
            decorators: {
                component: {
                    class: ['full', 'pad'],
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
                    value: () => of(['mainboard', 'modules']), // need to filter if for module
                },
            } as SelectComponent,
        },
        {
            name: 'type',
            type: 'string',
            decorators: {
                component: {
                    class: ['full', 'pad'],
                },
            },
            component: {
                name: 'select',
                type: 'mat',
                noneOption: {
                    type: 'string',
                    content: '--',
                },
                transformValue: (e) => e[1],
                options: {
                    displayTitle: '',
                    displayContent: (e) => e[0],
                    value: () =>
                        of([
                            ['Module state change', 'module'],
                            ['Module config change', 'module_config'],
                            ['Module Alarm Event', 'alarm'],
                            ['Warning', 'new_warning'],
                            ['Mainboard connection change', 'connection'],
                            ['Mainboard RTC change', 'update_rtc'],
                            ['Mainboard sync request', 'sync_request'],
                            ['Mainboard config change', 'growbe_config'],
                        ]),
                },
            } as SelectComponent,
        },
    ];//.filter(x => x !== null);
}

@Component({
    selector: 'app-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
    providers: [
        DatePipe,
    ]
})
@unsubscriber
export class TerminalComponent implements OnInit {
    @Input()
    set growbeId(growbeId: string) {
        this._growbeId = growbeId;
         if (!this.refDashboardItem) {
            this.item = {
                name: '',
                component: 'logs-terminal',
                copy: false,
                inputs: {
                    growbeId: this.growbeId,
                    moduleId: this.moduleId,
                },
                outputs: {},
            };
        }

        this.refreshLogs();
        this.searchBarForm = {
            type: 'simple',
            items: [
                {
                    type: 'object',
                    name: 'object',
                    decorators: {
                        class: ['frow', 'full', 'pad'],
                    },
                    properties: [
                      ...getTerminalSearchForm(),
                    ],
                }  as FormObject,
            ],
            actionsButtons: {},
            event: {
                submit: () => of(),
                afterFormCreated: (fg: FormGroup) => {
                    this.sub = fg.valueChanges
                        .pipe(map((value) => ({
                          group: value.object.group,
                          type: value.object?.type
                        })))
                        .subscribe((value) => {
                            this.where = value;
                            this.refreshLogs();
                        });
                },
            },
        };


        if (this.moduleId) return;

        (this.searchBarForm.items[0] as FormObject).properties.splice(0, 0, );
    }
    get growbeId() { return this._growbeId; }
    _growbeId: string;
    @Input()
    moduleId?: string;
    @Input()
    disableSearch: boolean;
    @Input()
    where: Where;

    logs: Observable<string[]>;
    searchBarForm: AutoFormData;

    item: DashboardItem;

    private filter: Filter<GrowbeLogs> = {
        offset: 0,
        limit: 200,
        order: ['timestamp desc'],
    };

    private sub: Subscription;

    constructor(
        @Optional()
        @Inject(DASHBOARD_ITEM_REF)
        private refDashboardItem: DashboardItem,
        private eventService: GrowbeEventService,
        private mainboardAPI: GrowbeMainboardAPI,
        private datePipe: DatePipe,
    ) {}

    ngOnInit(): void {
       
    }

    private refreshLogs() {
        const req = this.where
            ? Object.assign(this.filter, { where: this.where })
            : this.filter;
        this.logs = this.eventService
            .getGrowbeEventWithSource(
                this.growbeId,
                '/cloud/logs',
                (d) => JSON.parse(d),
                this.mainboardAPI.growbeLogs(this.growbeId).get(req),
            )
            .pipe(
                map((logs) =>
                    logs.map(
                        (log) =>
                            `[${this.datePipe.transform(log.timestamp, 'dd/MM HH:mm')}][${log.group}][${log.type}]${
                                log.growbeModuleId
                                    ? ' ' + log.growbeModuleId + ' '
                                    : ''
                            }${log.message}`,
                    ),
                ),
            );
    }
}
