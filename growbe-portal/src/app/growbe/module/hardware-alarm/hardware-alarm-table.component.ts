import { Component, Input, OnInit } from '@angular/core';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableLayoutComponent } from 'src/app/shared/table-layout/table-layout/table-layout.component';
import { GrowbeModuleAPI } from '../../api/growbe-module';
import { GrowbeModuleDefAPI } from '../../api/growbe-module-def';
import { getHardwareAlarmForm } from './hardware-alarm.form';
import { hardwareAlarmColumns } from './hardware-alarm.table';

@Component({
    template: `
        <app-table-layout
            [columns]="columns"
            [where]="where"
            [removeElement]="removeElement"
            [source]="(source$ | async)?.[0]"
            [formData]="(source$ | async)?.[1]"
        ></app-table-layout>
    `,
})
export class HardwareAlarmTableComponent implements OnInit {
    @Input() mainboardId: string;
    @Input() moduleId: string;

    source$: Observable<[TableLayoutComponent['source'], TableLayoutComponent['formData']]>;
    columns: TableLayoutComponent['columns'];
    where: TableLayoutComponent['where'];
    removeElement: TableLayoutComponent['removeElement'];

    constructor(
        private moduleAPI: GrowbeModuleAPI,
        private moduleDefAPI: GrowbeModuleDefAPI,
    ) {}

    ngOnInit(): void {
        this.columns = hardwareAlarmColumns;
        this.removeElement = (element) =>
            this.moduleDefAPI.removeAlarm(this.mainboardId, element);
        this.source$ = this.moduleAPI
            .moduleDef(this.moduleId)
            .get()
            .pipe(
                map((moduleDef) => {
                    const alarms = Object.values(moduleDef.properties)
                        .filter((md: any) => md.alarm)
                        .map((md: any) => md.alarm);
                    return [
                        new StaticDataSource(alarms),
                        getHardwareAlarmForm(
                            {
                                moduleDef,
                                id: this.moduleId,
                                mainboardId: this.mainboardId,
                            },
                            alarms.map((a) => a.property),
                            this.moduleDefAPI,
                        ),
                    ];
                }),
            );
    }
}
