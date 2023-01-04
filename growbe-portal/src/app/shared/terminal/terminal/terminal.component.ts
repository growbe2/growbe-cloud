import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Optional, TemplateRef, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import {
    AutoFormData,
    FormObject,
} from '@berlingoqc/ngx-autoform';
import { OnDestroyMixin, unsubscriber, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { Filter, Where } from '@berlingoqc/ngx-loopback';
import { DashboardItem, DASHBOARD_ITEM_REF } from '@growbe2/growbe-dashboard';
import { BehaviorSubject, combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take, tap, throttleTime, withLatestFrom } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { DatePipe } from '@angular/common';

import { BaseDashboardComponent } from '@growbe2/growbe-dashboard';
import { getCloudLogSearchForm } from '../cloud-log-search.form';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-terminal',
    templateUrl: './terminal.component.html',
    styleUrls: ['./terminal.component.scss'],
    providers: [
        DatePipe,
    ]
})
@unsubscriber
export class TerminalComponent extends OnDestroyMixin(BaseDashboardComponent) implements AfterViewInit {
    @ViewChild('scroller') scroller: ElementRef<HTMLDivElement>

    @Input()
    set growbeId(growbeId: string) {
        this._growbeId = growbeId;
    }

    get growbeId() { return this._growbeId; }
    _growbeId: string;

    @Input()
    moduleId?: string;
    @Input()
    disableSearch: boolean;

    // TODO: rework in something better but i'Ll just put if arround the two case
    private _type_log: 'device' | 'cloud';
    @Input()
    get typeLog(): TerminalComponent['_type_log'] {
        return this._type_log;
    }
    set typeLog(t: TerminalComponent['_type_log']) {
        this._type_log = t;
        if (this.item)
          this.item.inputs.typeLog = this.typeLog;
    }

    @Input()
    where: any;

    logs: Observable<string[]>;

    searchBarForm: AutoFormData;

    item: DashboardItem;

    private filter: Filter<any> = {
        offset: 0,
        limit: 200,
        order: ['timestamp desc'],
    };

    private sub: Subscription;


    public isLoadingMoreEvent = false;
    public endOfLogs = false;
    private cacheEntries: any[] = [];
    private subjectOlderEntries = new BehaviorSubject<any[]>([]);

    constructor(
        @Optional()
        @Inject(DASHBOARD_ITEM_REF)
        private refDashboardItem: DashboardItem,
        private eventService: GrowbeEventService,
        private mainboardAPI: GrowbeMainboardAPI,
        private datePipe: DatePipe,
        private activatedRoute: ActivatedRoute,
    ) {
      super();
    }

    ngOnInit() {
      this.onChange();
    }

    ngAfterViewInit(): void {
        this.scroller.nativeElement.addEventListener('scroll', (event) => {
            var element: any = event.target;
            if (element.scrollHeight - element.scrollTop === element.clientHeight)
            {
                if (!this.isLoadingMoreEvent) {
                    this.loadMoreEvent();
                }
            }
        });
    }

    private onChange() {
        if (!this.refDashboardItem) {
            this.item = {
                name: '',
                component: 'logs-terminal',
                copy: false,
                inputs: {
                    typeLog: this.typeLog,
                    growbeId: this.growbeId,
                    moduleId: this.moduleId,
                    where: this.where,
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
                      ...getCloudLogSearchForm(this.typeLog),
                    ],
                }  as FormObject,
            ],
            actionsButtons: {},
            event: {
                submit: () => of(),
                afterFormCreated: (fg: UntypedFormGroup) => {
                    this.sub = fg.valueChanges
                        .pipe(
                          debounceTime(100)
                        )
                        .pipe(map((value) => {
                            let where = {
                              group: value.object.group || undefined,
                              type: value.object?.type || undefined,
                              message: value.object?.message ? ({ like: value.object.message }) : undefined,
                              service: undefined
                            };

                            if (this.typeLog == 'device') {
                               if (where.group === 'mainboard')  {
                                   where.service = 'growbe-mainboard@dev.service';
                               } else if (where.group === 'autossh') {
                                   where.service = 'autossh@dev.service';
                               } else if (where.group === 'module') {
                                   where.service = 'growbe-pc-module@dev.service';
                               } else if (where.group === 'fluentbit') {
                                   where.service = 'fluentbit@dev.service';
                               }
                            }

                            return where;
                        }))
                        .subscribe((value) => {
                            this.resetSearch();
                            this.where = value;
                            if (!this.item) {
                              this.item.inputs.where = this.where;
                            }
                            this.refreshLogs();
                        });
                },
            },
        };


        if (this.moduleId) return;

        (this.searchBarForm.items[0] as FormObject).properties.splice(0, 0, );
    }

    private resetSearch() {
        this.cacheEntries = [];
        this.isLoadingMoreEvent = false;
        this.endOfLogs = false;
        this.filter.offset = 0;
        this.scroller.nativeElement.scrollTo({ top: 0 });
    }

    private refreshLogs() {
        this.logs = this.activatedRoute.data.pipe(
          untilComponentDestroyed(this),
          map((data) => {
              if (!this.growbeId && data.mainboard)  {
                this.growbeId = data.mainboard.id;
            }
              this.subjectOlderEntries = new BehaviorSubject([]);
              this.cacheEntries = [];
              return this.getRequestFilter();
          }),
          switchMap((req) => {
            return combineLatest([this.eventService
            .getGrowbeEventWithSource(
                this.growbeId,
                '/cloud/logs' + ((this.typeLog == 'device') ? '/device' : ''),
                (d) => { return JSON.parse(d) },
                this.getRequest(req),
                (data) => {
                    if (this.typeLog === 'cloud') {
                        return (!this.where.group || data.group === this.where.group) &&
                               (!this.where.type || data.type === this.where.type) &&
                               (!this.where.message || data.message.inclues(this.where.message));
                    } else if (this.typeLog === 'device') {
                        return (!this.where.service || data.service === this.where.service) &&
                               (!this.where.message || data.message.includes(this.getDeviceMessageRegex()));
                    }
                    return false;
                }
            ), this.subjectOlderEntries.asObservable()])
          }),
          map(([logs, oldLogs]) => {
              this.cacheEntries.push(...oldLogs);
              return [...logs, ...this.cacheEntries].map(
                        (log) => this.mapLog(log)
                    );
          }),
          tap(() => this.loadingEvent.next(null)),
          catchError((err) =>{ this.loadingEvent.next({error: err}); throw err; })
        );
    }

    private loadMoreEvent() {
        this.filter.offset += this.filter.limit;
        const req = this.getRequestFilter();

        this.isLoadingMoreEvent = true;
        this.getRequest(req).pipe(take(1)).subscribe((logs: any[]) => {
            if (logs.length >= this.filter.limit) {
              setTimeout(() => this.isLoadingMoreEvent = false);
            } else {
              this.endOfLogs = true;
            }
            this.subjectOlderEntries.next(logs);
        });
    }


    private getRequest(req: any) {
        // TODO : fix librarire null valid in where failed
        if (req?.where) {
          Object.keys(req.where).forEach(k => {
            if (req.where[k] == null) {
              delete req.where[k];
            }
          });
        }
        return (this.typeLog == 'cloud') ? this.mainboardAPI.growbeLogs(this.growbeId).get(req) : this.mainboardAPI.deviceLogs(this.growbeId).get(req);
    }


    private getRequestFilter() {
        if (!this.where) return this.filter;
        let where = {};
        if (this.typeLog == 'cloud') {
            where = this.where;
        } else {
            where = {
              service: this.where['service'],
              message: {
                like: this.getDeviceMessageRegex(),
              }
            };
        }
        return where
            ? Object.assign(this.filter, { where })
            : this.filter;
    }

    private getDeviceMessageRegex() {
      let message = this.where['message']?.like || '';
      let prefix = (this.where['type'] ? (this.where['type'] + '.*') : '') || '';
      return prefix + message;
    }

    private mapLog(log: any): string {
        if (this.typeLog == 'cloud') {
            return `[${this.datePipe.transform(log.timestamp, 'dd/MM HH:mm')}][${log.group}][${log.type}]${log.growbeModuleId? ' ' + log.growbeModuleId + ' ': ''}${log.message}`;
        } else {
            return `[${this.datePipe.transform(log.timestamp, 'dd/MM HH:mm')}]${log.message}`;
        }
    }

}
