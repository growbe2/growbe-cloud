import {
    AfterViewInit,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { AutoFormData, AutoFormDialogService, FormObject, InputProperty } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { Observable, of, Subscription } from 'rxjs';
import { Filter, Include, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { fuseAnimations } from '@berlingoqc/fuse';
import { GrowbeEventService } from '../../services/growbe-event.service';
import { ActionConfirmationDialogComponent, TemplateContentData, unsubscriber } from '@berlingoqc/ngx-common';
import {getGrowbeActionTableColumns, growbeActionsSource } from 'src/app/growbe/growbe-action/growbe-action.table';
import { filter, map, switchMap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { MatDialog } from '@angular/material/dialog';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { DictionnayProperty } from '@berlingoqc/ngx-autoform';
@Component({
    selector: 'app-growbe-manager-detail',
    templateUrl: './growbe-manager-detail.component.html',
    styleUrls: ['./growbe-manager-detail.component.scss'],
    animations: [fuseAnimations],
})
@unsubscriber
export class GrowbeManagerDetailComponent implements OnInit, AfterViewInit {
    @ViewChild(AutoTableComponent) table: AutoTableComponent;

    mainboard: Observable<any>;

    id: string;

    detailMainboardForm: AutoFormData = {
        type: 'simple',
        items: [
            {
                type: 'object',
                name: 'mainboard',
                properties: [
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
                        hint: 'Version du mainboard',
                    } as InputProperty,
                    {
                        name: 'cloudVersion',
                        type: 'string',
                        displayName: 'Version protobuf',
                        disabled: true,
                        hint: 'Version du cloud dans le mainboard',
                    } as InputProperty,
                    {
                        name: 'name',
                        type: 'string',
                        displayName: 'Nom',
                        required: false,
                    },
                    {
                        name: 'dictext',
                        type: 'dic',
                        displayName: 'Dictext',
                        templates: {
                          header: 'Free property'
                        },
                        availableProperty: [
                          {
                            type: 'string',
                            name: 'grid-size',
                          },
                          {
                            type: 'date',
                            name: 'grid-date',
                          },
                          {
                            type: 'object',
                            name: 'test',
                            properties: [
                              {
                                type: 'date',
                                name: 'date'
                              },
                              {
                                type: 'number',
                                name: 'pipe'
                              }
                            ]
                          } as FormObject
                        ]
                    } as DictionnayProperty
                ],
            } as FormObject,
        ],
        event: {
            initialData: () =>
                this.mainboardAPI.getById(this.id).pipe(
                    map((mainboard) => ({
                        mainboard: Object.assign(mainboard, {
                          dictext: {
                            'grid-size': 2,
                            'test': {
                              pipe: 5
                            }
                          }
                        }),
                    })),
                ),
            submit: (d) =>
                this.mainboardAPI.updateById(this.id, d.mainboard).pipe(
                    notify({
                        title: 'Mainboard modifié',
                        body: () => `${this.id}`,
                    }),
                ),
        },
    };

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

    constructor(
        private activatedRoute: ActivatedRoute,
        public mainboardAPI: GrowbeMainboardAPI,
        public moduleAPI: GrowbeModuleAPI,
        private growbeEventService: GrowbeEventService,
        private growbeActionAPI: GrowbeActionAPI,
        private autoformDialog: AutoFormDialogService,
        private matDialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.data.mainboard?.id;

        if (!this.id) {
            return;
        }

        this.actionsColumns = getGrowbeActionTableColumns(
          this.id,
          this.growbeActionAPI,
          this.autoformDialog,
        );

        this.mainboard = this.mainboardAPI.getById(this.id);

        this.moduleWhere = { mainboardId: this.id };

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
    }

    ngAfterViewInit() {}

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
        .subscribe(() => {})
    }
}
