import { Component, Input, OnInit } from '@angular/core';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableLayoutComponent } from 'src/app/shared/table-layout/table-layout/table-layout.component';
import { GrowbeMainboardAPI, HardwareAlarmRelation } from '../../api/growbe-mainboard';
import { GrowbeModuleAPI } from '../../api/growbe-module';
import { getHardwareAlarmForm } from './hardware-alarm.form';
import { hardwareAlarmColumns } from './hardware-alarm.table';

@Component({
    template: `
        <app-table-layout
            [columns]="columns"
            [where]="where"
            [removeElement]="removeElement"
            [source]="api"
            [formData]="(source$ | async)[0]"
            [formEdit]="(source$ | async)[1]"
            [disablePaginator]="true"
        ></app-table-layout>
    `,
})
export class HardwareAlarmTableComponent implements OnInit {
    @Input() mainboardId: string;
    @Input() moduleId: string;

    source$: Observable<[TableLayoutComponent['formData'], TableLayoutComponent['formData']]>;
    columns: TableLayoutComponent['columns'];
    where: TableLayoutComponent['where'];
    removeElement: TableLayoutComponent['removeElement'];

    api: HardwareAlarmRelation;


    constructor(
        private mainboardAPI: GrowbeMainboardAPI,
        private moduleAPI: GrowbeModuleAPI,
    ) {}

    ngOnInit(): void {
        this.columns = hardwareAlarmColumns;
        this.api = this.mainboardAPI.hardwareAlarms(this.mainboardId);
        this.api.moduleId = this.moduleId;
        this.removeElement = (element) => this.api.delete(element.property);
        this.source$ =
         this.moduleAPI.moduleDef(this.moduleId).get()
            .pipe(
                map((moduleDef: any) => {
                    return [
                        getHardwareAlarmForm(
                            {
                                moduleDef,
                                id: this.moduleId,
                                mainboardId: this.mainboardId,
                            },
                            [],
                            this.api,
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
                        ),
                    ];
                }),
            );
    }
}
