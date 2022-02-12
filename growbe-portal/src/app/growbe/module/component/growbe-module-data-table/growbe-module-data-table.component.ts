import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutoTableComponent, AutoTableConfig, TableColumn } from '@berlingoqc/ngx-autotable';
import { ActionConfirmationDialogComponent, ActionConfirmationService, ButtonsRowComponent, OnDestroyMixin, unsubscriber, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { Where } from '@berlingoqc/ngx-loopback';
import {
  GrowbeMainboard,
    GrowbeModule,
    GrowbeModuleDefWithRelations,
} from '@growbe2/ngx-cloud-api';
import { GrowbeModuleDef } from 'growbe-cloud-api/lib/cloud/model/growbeModuleDef';
import { forkJoin, Observable } from 'rxjs';
import { Subscription, combineLatest } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { transformModuleValue } from '../../module.def';

@Component({
    selector: 'app-growbe-module-data-table',
    templateUrl: './growbe-module-data-table.component.html',
    styleUrls: ['./growbe-module-data-table.component.scss'],
    providers: [DatePipe, ActionConfirmationService],
})
@unsubscriber
export class GrowbeModuleDataTableComponent extends OnDestroyMixin(Object) implements OnInit {
    @ViewChild(AutoTableComponent) table: AutoTableComponent;

    @Input() mainboardId: GrowbeMainboard['id'];
    @Input() moduleId: GrowbeModule['id'];
    @Input() displayProperties?: string[];
    @Input() pageSize?: AutoTableComponent['pageSize'];
    @Input() disablePaginator?: AutoTableComponent['disablePaginator'];
    @Input() disableOptions?: boolean;
    @Input() set config(config: AutoTableConfig) {
        this._config = Object.assign(config, this._config);
    }
    get config(): AutoTableConfig {
        return this._config;
    }

    columns: TableColumn[];

    where: Where;

    orderBy: string[] = ['createdAt DESC'];

    sub: Subscription;

    _config: AutoTableConfig = {
      decorators: {
          style: {
            container: {
              class: ['table-scroll-x'],
            }
         }
      }
    }

    constructor(
        private datePipe: DatePipe,
        public moduleAPI: GrowbeModuleAPI,
        private actionConfirmation: ActionConfirmationService,

        private growbeEvent: GrowbeEventService,
    ) {
      super();
    }

    ngOnInit(): void {
        if (!this.moduleId) {
            return;
        }
        this.where = {};

        this.growbeEvent.getGrowbeEvent(
          this.mainboardId,
          `/cloud/m/${this.moduleId}/fdata`,
          (d) => Object.assign(JSON.parse(d), {})
        ).pipe(untilComponentDestroyed(this)).subscribe((d) => {
          if (this.table.dataSource.data[0] && this.table.dataSource.data[0].id === d.id) {
              const data = this.table.dataSource.data;
              data[0] = d;
              this.table.dataSource.data = [...data];
          } else {
              this.table.dataSource.data = [ d, ...this.table.dataSource.data.slice(0, this.table.dataSource.data.length - 1)];
              (this.table as any).refreshCount();
          }
        });

        this.sub = combineLatest([
          this.moduleAPI.moduleDef(this.moduleId).get(),
          this.moduleAPI.getById(this.moduleId),
        ]).pipe(untilComponentDestroyed(this)).subscribe(([def, module]: any) => {
                this.columns = [
                    {
                        id: 'createdat',
                        title: 'CreatedAt',
                        content: (d) =>
                            this.datePipe.transform(d.createdAt, 'short'),
                    },
                    ...Object.values(def.properties).filter((prop: any) => !this.displayProperties || this.displayProperties.length === 0 || this.displayProperties.includes(prop.name)).map((prop: any) => {
                        return ({
                            id: prop.name,
                            title: prop.displayName ? prop.displayName : prop.name,
                            ...transformModuleValue(module.id.slice(0, 3), prop.name)
                            })
                        }),
                    (!this.disableOptions) ? {
                        id: 'options',
                        title: 'Options',
                        content: {
                            type: 'component',
                            extra: {
                                inputs: {
                                    buttons: [
                                        {
                                            title: {
                                                type: 'icon',
                                                content: 'delete',
                                            },
                                            style: 'mat-mini-fab',
                                            color: 'accent',
                                            click: (
                                                router: Router,
                                                context: any,
                                            ) => {
                                                this.moduleAPI.growbeSensorValues(module.id)
                                                    .delete(context.id)
                                                    .pipe(take(1), this.actionConfirmation.confirmBefore({ title: '' }))
                                                    .subscribe(() => {
                                                      this.table.refreshData();
                                                      (this.table as any).refreshCount();
                                                    });
                                            },
                                        },
                                    ],
                                },
                            },
                            content: ButtonsRowComponent,
                        },
                    } as any : undefined,
                ].filter(x => x);
            });
    }
}
