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
import { AutoFormData, AutoFormDialogService, FormObject, InputProperty } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { Observable, of, Subscription } from 'rxjs';
import { Filter, Include, StaticDataSource, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs, GrowbeMainboard, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { fuseAnimations } from '@berlingoqc/fuse';
import { GrowbeEventService } from '../../services/growbe-event.service';
import { ActionConfirmationDialogComponent, OnDestroyMixin, TemplateContentData, unsubscriber, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { getGrowbeActionTableColumns, growbeActionsSource } from 'src/app/growbe/growbe-action/growbe-action.table';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { MatDialog } from '@angular/material/dialog';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
@Component({
    selector: 'app-growbe-manager-detail',
    templateUrl: './growbe-manager-detail.component.html',
    styleUrls: ['./growbe-manager-detail.component.scss'],
    animations: [fuseAnimations],
})
@unsubscriber
export class GrowbeManagerDetailComponent extends OnDestroyMixin(Object) implements OnInit, AfterViewInit {
    @ViewChild(AutoTableComponent) table: AutoTableComponent;
    @ViewChild('tablemodules') tableModules: AutoTableComponent;
    @ViewChild('tableactions') tableActions: AutoTableComponent;


    emitterMainboardChange: EventEmitter<GrowbeMainboard> = new EventEmitter();

    mainboard: any;

    id: string;

    detailMainboardForm: AutoFormData;

    moduleWhere: Where<GrowbeModule>;
    moduleIncludes: Include[] = [{ relation: 'moduleDef' }];
    moduleColumns: TableColumn[] = [
        {
            id: 'uid',
            title: 'UID',
            content: (c) => c.id,
        },
        {
            id: 'name',
            title: 'Name',
            content: (c) => c.moduleDef?.name,
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
        private growbeEventService: GrowbeEventService,
        private growbeActionAPI: GrowbeActionAPI,
        private autoformDialog: AutoFormDialogService,
        private matDialog: MatDialog,
        private changeDetectionRef: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit(): void {

        this.actionsColumns = getGrowbeActionTableColumns(
            () => this.id,
            this.growbeActionAPI,
            this.autoformDialog,
        );

        this.data$ = this.activatedRoute.data.pipe(
            untilComponentDestroyed(this),
            switchMap(({ mainboard }) => this.mainboardAPI.getById(mainboard.id)),
            map((mainboard: GrowbeMainboard) => {
                this.id = mainboard.id;
                this.mainboard = mainboard;


                this.moduleWhere = { mainboardId: this.id };

                return {
                    actionsColumns: this.actionsColumns,
                    mainboard: this.mainboard,
                    moduleWhere: this.moduleWhere,
                };
            }),
            tap(() => {

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
                            name: 'name',
                            type: 'string',
                            displayName: 'Nom',
                            required: false,
                        },
                    ],
                    event: {
                        initialData: () =>
                            this.mainboardAPI.getById(this.id),
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
                        const index = this.table.dataSource.data.findIndex(
                            (x) => x.id === state.id,
                        );
                        if (index === -1) {
                            this.table.refreshData();
                        }
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
}
