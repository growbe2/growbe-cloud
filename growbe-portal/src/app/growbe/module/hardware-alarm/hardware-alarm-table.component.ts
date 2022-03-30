import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { TableLayoutComponent } from 'src/app/shared/table-layout/table-layout/table-layout.component';
import { GrowbeMainboardAPI, HardwareAlarmRelation } from '../../api/growbe-mainboard';
import { GrowbeModuleAPI } from '../../api/growbe-module';
import { getHardwareAlarmForm } from './hardware-alarm.form';
import { getHardwareAlarmColumns } from './hardware-alarm.table';
import { BaseDashboardComponent } from '@growbe2/growbe-dashboard';
@Component({
    template: `
        <app-table-layout
            #table
            [columns]="(source$ | async)[2]"
            [where]="where"
            [removeElement]="removeElement"
            [source]="api"
            [formData]="(source$ | async)[0]"
            [formEdit]="(source$ | async)[1]"
            [disablePaginator]="true"
        ></app-table-layout>
    `,
})
export class HardwareAlarmTableComponent extends BaseDashboardComponent implements OnInit {
    @ViewChild(TableLayoutComponent) table: TableLayoutComponent;

    @Input() mainboardId: string;
    @Input() moduleId: string;

    source$: Observable<[TableLayoutComponent['formData'], TableLayoutComponent['formData'], TableLayoutComponent['columns']]>;
    where: TableLayoutComponent['where'];
    removeElement: TableLayoutComponent['removeElement'];

    api: HardwareAlarmRelation;


    constructor(
        private mainboardAPI: GrowbeMainboardAPI,
        private moduleAPI: GrowbeModuleAPI,
    ) {
      super();
    }

    ngOnInit(): void {
        this.api = this.mainboardAPI.hardwareAlarms(this.mainboardId);
        this.api.moduleId = this.moduleId;
        this.removeElement = (element) => this.api.delete(element.property).pipe(tap(() => this.table.autoTableComponent.refreshData()));
        this.source$ =
         this.moduleAPI.moduleDef(this.moduleId).get()
            .pipe(
                map((moduleDef: any) => {
                  this.loadingEvent.next(null);
                    return [
                        getHardwareAlarmForm(
                            {
                                moduleDef,
                                id: this.moduleId,
                                mainboardId: this.mainboardId,
                            },
                            [],
                            this.api,
                            () => this.table.autoTableComponent.refreshData(),
                        ),
                        getHardwareAlarmForm(
                          {
                            moduleDef,
                            id: this.moduleId,
                            mainboardId: this.mainboardId
                          },
                          [],
                          this.api,
                          undefined,
                          true,
                          () => this.table.autoTableComponent.refreshData(),
                        ),
                        getHardwareAlarmColumns(moduleDef),
                    ];
                }),
            );
    }
}
