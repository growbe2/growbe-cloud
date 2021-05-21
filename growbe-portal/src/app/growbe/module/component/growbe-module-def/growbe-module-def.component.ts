import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import { GrowbeModuleDefWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';

@Component({
    selector: 'app-growbe-module-def',
    templateUrl: './growbe-module-def.component.html',
    styleUrls: ['./growbe-module-def.component.scss'],
})
export class GrowbeModuleDefComponent implements OnInit {
    @Input() moduleDefId: string;

    columns: TableColumn[] = [
        {
            id: 'name',
            title: 'Name',
            content: (p) => (p.displayName ? p.displayName : p.name),
        },
        {
            id: 'definition',
            title: 'Description',
            content: (p) => p.definition,
        },
        {
            id: 'unit',
            title: 'Unit',
            content: (p) => p.unit,
        },
    ];

    moduleDef: GrowbeModuleDefWithRelations;
    source;

    constructor(private moduleDefAPI: GrowbeModuleDefAPI) {}

    async ngOnInit(): Promise<void> {
        if (!this.moduleDefId) {
            return;
        }
        this.moduleDef = await this.moduleDefAPI
            .getById(this.moduleDefId)
            .pipe(take(1))
            .toPromise();
        this.source = new StaticDataSource(
            Object.values(this.moduleDef.properties),
        );
    }
}
