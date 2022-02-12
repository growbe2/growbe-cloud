import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutoTableComponent, AutoTableConfig, TableColumn } from '@berlingoqc/ngx-autotable';
import { ActionConfirmationDialogComponent, ButtonsRowComponent, OnDestroyMixin, unsubscriber, untilComponentDestroyed } from '@berlingoqc/ngx-common';
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
    providers: [DatePipe],
})
@unsubscriber
export class GrowbeModuleDataTableComponent extends OnDestroyMixin(Object) implements OnInit {
    @ViewChild(AutoTableComponent) table: AutoTableComponent;

    @Input() mainboardId: GrowbeMainboard['id'];
    @Input() moduleId: GrowbeModule['id'];

    columns: TableColumn[];

    where: Where;

    orderBy: string[] = ['createdAt DESC'];

    sub: Subscription;

    config: AutoTableConfig = {
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

        private matDialog: MatDialog,

        private growbeEvent: GrowbeEventService,
    ) {
      super();
    }

    confirmBefore<T>(): (obs: Observable<T>) => Observable<T> {
      return (obs) => {
        return this.matDialog.open(ActionConfirmationDialogComponent, {
          data: {tite: ''}
        }).afterClosed().pipe(
          filter(x => x),
          switchMap(() => obs)
        )
      }
    }

    ngOnInit(): void {
        if (!this.moduleId) {
            return;
        }
        this.where = {};

        this.growbeEvent.getGrowbeEvent(
          this.mainboardId,
          `/cloud/m/${this.moduleId}/data`,
          (d) => Object.assign(JSON.parse(d), {})
        ).pipe(untilComponentDestroyed(this)).subscribe((d) => {
          console.log('DDDD', d);
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
                    ...Object.values(def.properties).map((prop: any) => ({
                        id: prop.name,
                        title: prop.displayName ? prop.displayName : prop.name,
                        content: (e) =>
                            transformModuleValue(
                                module.id.slice(0, 3),
                                e.values[prop.name],
                            ),
                    })),
                    {
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
                                                    .pipe(take(1), this.confirmBefore())
                                                    .subscribe(() => {
                                                      this.table.refreshData();
                                                    });
                                            },
                                        },
                                    ],
                                },
                            },
                            content: ButtonsRowComponent,
                        },
                    } as any,
                ];
            });
    }
}
