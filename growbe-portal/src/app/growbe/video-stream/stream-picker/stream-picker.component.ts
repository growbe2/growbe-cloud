import { Clipboard } from '@angular/cdk/clipboard';
import {
    AfterViewInit,
    Component,
    Directive,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import {
    AutoFormComponent,
    AutoFormData,
    AutoFormDialogService,
    DialogFormContainer,
    FormObject,
} from '@berlingoqc/ngx-autoform';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { ButtonsRowComponent, envConfig } from '@berlingoqc/ngx-common';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import { notify } from '@berlingoqc/ngx-notification';
import { of } from 'rxjs';
//import { GrowbeStream } from '@growbe2/ngx-cloud-api/lib/cloud/model/growbeStream';
import { take, tap } from 'rxjs/operators';
import { GrowbeStreamAPI } from 'src/app/growbe/api/growbe-stream';

type newEditFormValue = { streamControl: { name: string } };

@Component({
    selector: 'app-stream-picker',
    templateUrl: './stream-picker.component.html',
    styleUrls: ['./stream-picker.component.scss'],
})
export class StreamPickerComponent implements OnInit, AfterViewInit {
    @Input() set growbeId(growbeId: string) {
        this._growbeId = growbeId;
        this.getStreamList();
    }
    get growbeId() { return this._growbeId; }
    _growbeId: string;
    @Output() streamSelected = new EventEmitter<any>();
    @ViewChild('launch') launch: TemplateRef<any>;
    source: StaticDataSource<any>;

    columns: TableColumn[] = [
        {
            id: 'streamName',
            title: 'Nom',
            content: (data) => data.streamName,
        },
        {
            id: 'launcher',
            title: 'Se Connecter',
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
                                    content: 'delete',
                                },
                                style: 'mat-mini-fab',
                                click: (router: Router, stream: any) => {
                                    this.deleteStream(stream);
                                },
                            },
                            {
                                title: {
                                    type: 'icon',
                                    content: 'info',
                                },
                                style: 'mat-mini-fab',
                                click: (router: Router, stream: any) => {
                                    this.autoFormDialogService.open(
                                        this.getStreamConnectionInfoForm(
                                            stream,
                                        ),
                                    );
                                },
                            },
                        ],
                    },
                },
            },
        },
    ];

    getStreamConnectionInfoForm = (stream: any): AutoFormData => ({
        type: 'dialog',
        typeData: {
            minWidth: '50%',
        } as DialogFormContainer,
        event: {
            submit: () => of(),
            initialData: {
                info: {
                    server: `${envConfig.nms.replace('https', 'rtmp')}/live`,
                    apiKey: `${stream.streamName}${stream.url}`,
                },
            },
        },
        items: [
            {
                type: 'object',
                name: 'info',
                properties: [
                    {
                        type: 'string',
                        name: 'server',
                    },
                    {
                        type: 'string',
                        name: 'apiKey',
                    },
                ],
            } as FormObject,
        ],
    });

    newEditFormData: AutoFormData = {
        type: 'dialog',
        event: {
            submit: (data: newEditFormValue) =>
                this.growbeStreamAPI
                    .createLiveStream(
                        this.growbeId,
                        this.growbeId + '-' + data.streamControl.name,
                    )
                    .pipe(
                        notify({
                            title: 'Stream ajouté.',
                            titleFailed: 'Échec. Veuillez réssayer.',
                            body: () => data.streamControl.name,
                        }),
                        tap(() => this.getStreamList()),
                    ),
        },
        items: [
            {
                type: 'object',
                name: 'streamControl',
                properties: [
                    {
                        type: 'string',
                        name: 'name',
                        displayName: 'Nom du stream',
                        required: true,
                        component: {
                            name: 'input',
                            type: 'mat',
                            options: {
                                displayTitle: 'Nom du stream',
                            },
                        } as any,
                    },
                ],
            }  as FormObject,
        ],
    };

    constructor(
        private clipboard: Clipboard,
        public growbeStreamAPI: GrowbeStreamAPI,
        public autoFormDialogService: AutoFormDialogService,
    ) {}

    ngOnInit() {
    }

    ngAfterViewInit() {
        (this.columns[1].content as any).content = this.launch;
    }

    async getStreamList() {
        this.source = new StaticDataSource(
            await this.growbeStreamAPI
                .getLiveStreams(this.growbeId)
                .pipe(take(1))
                .toPromise(),
        );
    }

    deleteStream(stream: any): void {
        this.growbeStreamAPI
            .deleteLiveStream(stream.id)
            .pipe(
                notify({
                    title: 'Stream supprimé',
                    titleFailed: 'Échec. Veuillez réssayer.',
                    body: () => stream.streamName,
                }),
                tap(() => this.getStreamList()),
            )
            .subscribe();
    }
}
