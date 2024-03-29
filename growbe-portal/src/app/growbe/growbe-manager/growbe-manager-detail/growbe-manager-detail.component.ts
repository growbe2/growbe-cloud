import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';
import { AutoTableComponent, AutoTableModule, TableColumn } from '@berlingoqc/ngx-autotable';
import { AutoFormData, AutoFormDialogService, FormObject, InputProperty, SelectComponent } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { Observable, of, Subscription, timer } from 'rxjs';
import { Filter, Include, StaticDataSource, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs, GrowbeMainboard, GrowbeMainboardWithRelations, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { fuseAnimations, FuseNavigationService, FuseSidebarService } from '@berlingoqc/fuse';
import { GrowbeEventService } from '../../services/growbe-event.service';
import { ActionConfirmationDialogComponent, OnDestroyMixin, TemplateContentData, unsubscriber, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { getGrowbeActionTableColumns, growbeActionsSource } from 'src/app/growbe/growbe-action/growbe-action.table';
import { filter, map, startWith, switchMap, take, tap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { MatDialog } from '@angular/material/dialog';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { MatTabChangeEvent } from '@angular/material/tabs';
import {GrowbeProcessConfigService} from '../../services/growbe-process-config.service';
import {GrowbeImageConfigService} from '../../services/growbe-image-config.service';
import {TerminalComponent} from 'src/app/shared/terminal/terminal/terminal.component';

let i = 1;
@Component({
    selector: 'app-growbe-manager-detail',
    templateUrl: './growbe-manager-detail.component.html',
    styleUrls: ['./growbe-manager-detail.component.scss'],
    animations: [fuseAnimations],
})
@unsubscriber
export class GrowbeManagerDetailComponent extends OnDestroyMixin(Object) implements OnInit, AfterViewInit {

    emitterMainboardChange: EventEmitter<GrowbeMainboard> = new EventEmitter();

    options: any[] = [
        {
            name: 'Modules',
            icon: 'device_hub'
        },
        {
            name: 'Commands',
            icon: 'send' },
        {
            name: 'Virtual Relay',
            icon: 'merge_type'
        },
        {
            name: 'Parameters',
            icon: 'settings'
        },
        {
            name: 'Logs',
            icon: 'manage_search'
        },
        {
            name: 'Stream',
            icon: 'smart_display'
        }
    ];

    currentIndex: number = 0;

    mainboard: any;

    id: string;

    type_log: TerminalComponent['typeLog'] = 'cloud';

    detailMainboardForm: AutoFormData;
    processMainboardForm: AutoFormData;
    cloudMainboardForm: AutoFormData;
    imageConfigForm: AutoFormData;

    moduleWhere: Where<GrowbeModule>;
    moduleIncludes: Include[] = [{ relation: 'moduleDef' }];
    moduleOrderBy: string[] = ['atIndex'];
    moduleColumns: TableColumn[] = [
        {
            id: 'uid',
            title: 'UID',
            content: (c) => c.id,
            breakPoints: '(min-width: 600px)'
        },
        {
            id: 'name',
            title: 'Name',
            content: (c) => c.moduleDef?.displayName ? c.moduleDef?.displayName : c.moduleDef?.name,
        },
        {
            id: 'board',
            title: 'Board',
            content: (c) => `${c.board || 'i2c'}:${c.boardAddr || '1'}`,
            breakPoints: '(min-width: 600px)'
        },
        {
            id: 'port',
            title: 'Port',
            content: (c) => this.growbeEventService.getGrowbeEvent(this.id, `/cloud/m/${c.id}/state`, JSON.parse).pipe(startWith(c), map(x => x.connected ? x.atIndex : '')),
        },
    ];

    sub: Subscription;

    actionsColumns: TableColumn[];
    actionsSource = growbeActionsSource;

    data$: Observable<{
        actionsColumns: TableColumn[],
        mainboard: GrowbeMainboard,
        moduleWhere: Where<GrowbeModule>,
    }>;

    constructor(
        private activatedRoute: ActivatedRoute,
        public mainboardAPI: GrowbeMainboardAPI,
        public moduleAPI: GrowbeModuleAPI,
        private imageConfigService: GrowbeImageConfigService,
        private processConfigService: GrowbeProcessConfigService,
        private growbeEventService: GrowbeEventService,
        private growbeActionAPI: GrowbeActionAPI,
        private autoformDialog: AutoFormDialogService,
        private matDialog: MatDialog,
        private changeDetectionRef: ChangeDetectorRef,
        private fuseSideBarService: FuseSidebarService,
    ) {
        super();
    }

    ngOnInit(): void {

        this.log_type =

        this.actionsColumns = getGrowbeActionTableColumns(
            () => this.mainboard ? this.mainboard : {id: this.id},
            this.growbeEventService,
            this.growbeActionAPI,
            this.autoformDialog,
        );


        let subEventState: Subscription;

        this.data$ = this.activatedRoute.data.pipe(
            untilComponentDestroyed(this),
            switchMap(({ mainboard }) => this.mainboardAPI.getById(mainboard.id)),
            map((mainboard: GrowbeMainboardWithRelations) => {
                this.id = mainboard.id;
                this.mainboard = mainboard;

                this.imageConfigForm = this.imageConfigService.getGrowbeImageConfigForm(this.id);
                this.processMainboardForm = this.processConfigService.getGrowbeProcessForm(mainboard);
                if (subEventState) { subEventState.unsubscribe();}

                this.moduleWhere = { mainboardId: this.id };

                return {
                    actionsColumns: this.actionsColumns,
                    mainboard: this.mainboard,
                    moduleWhere: this.moduleWhere,
                };
            }),
            tap(() => {

                this.cloudMainboardForm = {
                    type: 'simple',
                    items: [
                        {
                            name: 'hearthBeath',
                            type: 'number'
                        },
                        {
                            name: 'preferedCommandConnnection',
                            type: 'string',
                            required: true,
                            component: {
                              name: 'select',
                              type: 'mat',
                              transformValue: (e) => {
                                return {mqtt: 0, proxy: 1}[e];
                              },
                              compareWith: (e,a) => {
                                // TODO : not working for some reason
                                return a ? (e === (['mqtt', 'proxy'][a])): false;
                              },
                              options: {
                                displayContent: (e) => {
                                  return e;
                                },
                                value: of(['mqtt', 'proxy']),
                              }
                            } as SelectComponent,
                        }
                    ],
                    event: {
                        initialData: () =>
                            this.mainboardAPI.getById(this.id).pipe(take(1),map((x: GrowbeMainboardWithRelations) => x.growbeMainboardConfig.config)),
                        submit: (d) => this.mainboardAPI.updateCloudConfig(this.id, d).pipe(
                                notify({
                                    title: 'Mainboard Cloud Config Updated',
                                    body: () => `${this.id}`,
                                }),
                        ),
                    },

                };

                this.detailMainboardForm = {
                    type: 'simple',
                    items: [
                        {
                            name: 'id',
                            type: 'string',
                            displayName: 'ID',
                            disabled: true,
                        },
                        {
                            name: 'version',
                            type: 'string',
                            displayName: 'Version du mainboard',
                            disabled: true,
                        } as InputProperty,
                        {
                            name: 'cloudVersion',
                            type: 'string',
                            displayName: 'Version protobuf',
                            disabled: true,
                        } as InputProperty,
                        {
                            name: 'host',
                            type: 'object',
                            disabled: true,
                            properties: [
                              {
                                  name: 'kernel',
                                  type: 'string',
                                  disabled: true,
                              },
                              {
                                  name: 'architecture',
                                  type: 'string',
                                  disabled: true,
                              },
                              {
                                  name: 'os',
                                  type: 'string',
                                  disabled: true,
                              },
                              {
                                  name: 'deviceType',
                                  type: 'string',
                                  displayName: 'hostname',
                                  disabled: true
                              }
                            ]
                        } as any,
                        {
                            name: 'name',
                            type: 'string',
                            displayName: 'Nom',
                            required: false,
                        },
                    ],
                    event: {
                        initialData: () =>
                            this.mainboardAPI.getById(this.id).pipe(take(1)),
                        submit: (d) =>
                            this.mainboardAPI.updateById(this.id, d).pipe(
                                notify({
                                    title: 'Mainboard modifié',
                                    body: () => `${this.id}`,
                                }),
                            ),
                    },
                };

                this.emitterMainboardChange.next(this.mainboard);

                this.changeDetectionRef.detectChanges();

                this.sub = this.growbeEventService
                    .getGrowbeEvent(this.id, '/cloud/m/+/state', JSON.parse)
                    .subscribe((state) => {
                        console.log('Module state change', state);
                        this.moduleAPI.requestGet.onModif(of(null)).subscribe(() => {});
                    });
            }),
        );
    }

    ngAfterViewInit() { }

    deleteModule(moduleId: string) {
        this.matDialog.open(ActionConfirmationDialogComponent, {
            data: {
                title: ''
            }
        })
            .afterClosed().pipe(
                filter(x => x),
                switchMap(() => this.moduleAPI.delete(moduleId)),
            )
            .subscribe(() => { })
    }

    closeSideBar() {
        this.fuseSideBarService.getSidebar('project-dashboard-right-sidebar-1').close();
    }
}
