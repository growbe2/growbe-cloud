import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { ButtonsRowComponent } from '@berlingoqc/ngx-common';
import { Include, Where } from '@berlingoqc/ngx-loopback';
import { AutoFormData, AutoFormDialogService } from '@berlingoqc/ngx-autoform';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';
import { GrowbeWarningAPI } from '../../api/growbe-warning';
import { growbeWarningActions } from '../growbe-warning-action';
import { GrowbeWarning } from '@growbe2/ngx-cloud-api';
import { GrowbeActionAPI } from '../../api/growbe-action';

@Component({
    selector: 'app-warning-table',
    templateUrl: './warning-table.component.html',
    styleUrls: ['./warning-table.component.scss'],
})
export class WarningTableComponent implements OnInit, AfterViewInit {
    actions = growbeWarningActions;
    @ViewChild('informations') informationTemplate: TemplateRef<any>;

    @Input() growbeId: string;

    warningColumns: TableColumn[];

    warningInclude: Include[] = [{ relation: 'warningKey' }];

    constructor(
        public mainboardAPI: GrowbeMainboardAPI,
        public warningAPI: GrowbeWarningAPI,
        public actionAPI: GrowbeActionAPI,
        private autoformDialog: AutoFormDialogService,
    ) {
        this.warningColumns = [
            {
                id: 'createdAt',
                title: 'Created At',
                content: (i) => i.createdAt,
            },
            {
                id: 'warningKeyId',
                title: {
                    type: 'string',
                    content: 'ID',
                },
                content: {
                    type: 'func',
                    content: (i) => i.warningKeyId,
                },
            },
            {
                id: 'data',
                title: 'Information',
                content: {
                    type: 'template',
                    content: null,
                },
            },
            {
                id: 'options',
                title: 'Options',
                content: {
                    type: 'component',
                    content: ButtonsRowComponent,
                    extra: {
                        inputs: {
                            buttons: [
                                {
                                    title: {
                                        type: 'icon',
                                        content: 'pending_actions',
                                    },
                                    style: 'mat-mini-fab',
                                    click: (
                                        router: Router,
                                        context: GrowbeWarning,
                                    ) => {
                                        const action =
                                            growbeWarningActions[
                                                context.warningKeyId
                                            ];
                                        if (action?.formFunc) {
                                            const form = action.formFunc() as AutoFormData;
                                            (form.event.submit = (
                                                data: any,
                                            ) => {
                                                data = action.formFuncTransform(
                                                    data,
                                                );
                                                return this.actionAPI.executeAction(
                                                    context.warningKeyId,
                                                    this.growbeId,
                                                    data,
                                                );
                                            }),
                                                this.autoformDialog.open(form);
                                        }
                                    },
                                },
                            ],
                        },
                    },
                },
            },
        ];
    }

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.warningColumns[2].content = {
            content: this.informationTemplate,
            type: 'template',
        };
    }
}
