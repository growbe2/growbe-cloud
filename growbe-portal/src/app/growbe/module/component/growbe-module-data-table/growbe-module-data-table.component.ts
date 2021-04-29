import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { Where } from '@berlingoqc/ngx-loopback';
import {
    GrowbeModule,
    GrowbeModuleDefWithRelations,
} from '@growbe2/ngx-cloud-api';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';
import { GrowbeSensorValueAPI } from 'src/app/growbe/api/growbe-sensor-value';
import { ButtonsRowComponent } from 'src/app/shared/buttons-row/buttons-row/buttons-row.component';

@Component({
    selector: 'app-growbe-module-data-table',
    templateUrl: './growbe-module-data-table.component.html',
    styleUrls: ['./growbe-module-data-table.component.scss'],
    providers: [DatePipe],
})
export class GrowbeModuleDataTableComponent implements OnInit {
    @ViewChild(AutoTableComponent) table: AutoTableComponent;

    @Input() module: GrowbeModule;

    columns: TableColumn[];

    where: Where;

    orderBy: string[] = ['createdAt DESC'];

    constructor(
        private datePipe: DatePipe,
        private moduleDefAPI: GrowbeModuleDefAPI,
        public sensorValueAPI: GrowbeSensorValueAPI,
    ) {}

    ngOnInit(): void {
        if (!this.module) {
            return;
        }
        this.where = {
            moduleId: this.module.uid,
        };
        this.moduleDefAPI
            .getById(this.module.moduleName)
            .subscribe((def: GrowbeModuleDefWithRelations) => {
                this.columns = [
                    {
                        id: 'createdat',
                        title: 'CreatedAt',
                        content: (d) =>
                            this.datePipe.transform(d.createdAt, 'short'),
                    },
                    ...def.properties.map((prop) => ({
                        id: prop.name,
                        title: prop.name,
                        content: (e) => e[prop.name],
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
                                                this.sensorValueAPI
                                                    .delete(context.id)
                                                    .subscribe(() => {
                                                        this.table.refreshData();
                                                        this.table.length -= 1;
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
