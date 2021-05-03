import { AfterViewInit, Component, Directive, EventEmitter, HostListener, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AutoFormComponent, AutoFormData } from '@berlingoqc/ngx-autoform';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import { notify } from '@berlingoqc/ngx-notification';
import { GrowbeStream } from '@growbe2/ngx-cloud-api/lib/cloud/model/growbeStream';
import { take } from 'rxjs/operators';
import { GrowbeStreamAPI } from 'src/app/growbe/api/growbe-stream';

@Directive({ selector: '[formComponent]'})
export class NewEditFormDirective {
    @Input() formComponent: AutoFormComponent;
    @HostListener('click') click() {
        this.formComponent.exposition.open();
        console.log(this.formComponent.exposition.this.formGroup.controls);
    }
}

@Component({
    selector: 'app-stream-picker',
    templateUrl: './stream-picker.component.html',
    styleUrls: ['./stream-picker.component.scss'],
})
export class StreamPickerComponent implements OnInit, AfterViewInit {

    @Input() growbeId: string;
    @Output() streamSelected = new EventEmitter<any>();
    @ViewChild('launch') launch: TemplateRef<any>; 
    @ViewChild('delete') delete: TemplateRef<any>;
    source: StaticDataSource<GrowbeStream>;

    constructor(public growbeStreamAPI: GrowbeStreamAPI) {}

    async ngOnInit() {
        this.source = new StaticDataSource(
            await this.growbeStreamAPI
                .getLiveStreams(this.growbeId)
                .pipe(take(1))
                .toPromise()
        );
    }

    ngAfterViewInit() {
        (this.columns[1].content as any).content = this.launch;
        (this.columns[2].content as any).content = this.delete;
    }

    createStream(): void {
        this.growbeStreamAPI
            .createLiveStream(this.growbeId, 'bc_test_3')
            .pipe(
                notify({
                    title: 'Stream ajouté.',
                    titleFailed: 'Échec. Veuillez réssayer.',
                    body: () => 'bc_test_3',
                })
            )
            .subscribe();
    }

    deleteStream(stream: GrowbeStream): void {
        this.growbeStreamAPI
            .deleteLiveStream(stream.id)
            .pipe(
                notify({
                    title: 'Stream supprimé',
                    titleFailed: 'Échec. Veuillez réssayer.',
                    body: () => stream.streamName
                })
            )
            .subscribe();
    }


    columns: TableColumn[] = [
        {
            id: 'streamName',
            title: 'Nom',
            content: (g) => g.streamName,
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
            id: 'delete',
            title: 'Supprimer',
            content: {
                type: 'template',
                content: null,
            },
        },
    ];

    newEditFormData: AutoFormData = {
        type: 'dialog',
        items: [
            {
                type: 'object',
                name: 'streamName',
                properties: [
                    {
                        type: 'string',
                        name: 'streamName',
                        displayName: 'Nom du stream',
                        required: true,
                        component: {
                            name: 'input',
                            type: 'mat',
                            options: {
                                displayTitle: 'Nom du stream',
                            }
                        } as any
                    }
                ]
            }
        ]
    }
}
