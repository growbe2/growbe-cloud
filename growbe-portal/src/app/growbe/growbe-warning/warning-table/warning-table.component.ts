import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { Include, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeWarningAPI } from '../../api/growbe-warning';

@Component({
    selector: 'app-warning-table',
    templateUrl: './warning-table.component.html',
    styleUrls: ['./warning-table.component.scss'],
})
export class WarningTableComponent implements OnInit {
    warningColumns: TableColumn[] = [
        {
            id: 'id',
            title: {
                type: 'string',
                content: 'ID',
            },
            content: {
                type: 'func',
                content: (i) => JSON.stringify(i),
            },
        },
    ];

    warningInclude: Include[] = [{ relation: 'warningKey' }];
    warningWhere: Where<any> = {};

    constructor(public warningAPI: GrowbeWarningAPI) {}

    ngOnInit(): void {}
}
