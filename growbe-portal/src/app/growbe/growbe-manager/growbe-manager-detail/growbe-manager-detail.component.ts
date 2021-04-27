import {
    AfterViewInit,
    Component,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GrowbeMainboardAPI } from '../../api/growbe-mainboard';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { AutoFormData, InputProperty } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { Observable, Subscription } from 'rxjs';
import { Filter, Include, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeLogs, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { fuseAnimations } from '@berlingoqc/fuse';
import { GrowbeEventService } from '../../services/growbe-event.service';
import { unsubscriber } from '@berlingoqc/ngx-common';
@Component({
    selector: 'app-growbe-manager-detail',
    templateUrl: './growbe-manager-detail.component.html',
    styleUrls: ['./growbe-manager-detail.component.scss'],
    animations: [fuseAnimations],
})
@unsubscriber
export class GrowbeManagerDetailComponent implements OnInit, AfterViewInit {
    @ViewChild(AutoTableComponent) table: AutoTableComponent;

    mainboard: Observable<any>;

    logFilter: Filter<GrowbeLogs> = {
        order: ['timestamp desc'],
        limit: 20,
        offset: 0,
    };

    id: string;

    detailMainboardForm: AutoFormData = {
        type: 'simple',
        items: [
            {
                type: 'object',
                name: 'mainboard',
                properties: [
                    {
                        name: 'id',
                        type: 'string',
                        displayName: 'ID',
                        disabled: true,
                    },
                    {
                        name: 'version',
                        type: 'string',
                        displayName: 'Version du mainboard',
                        disabled: true,
                        hint: 'Version du mainboard',
                    } as InputProperty,
                    {
                        name: 'cloudVersion',
                        type: 'string',
                        displayName: 'Version protobuf',
                        disabled: true,
                        hint: 'Version du cloud dans le mainboard',
                    } as InputProperty,
                    {
                        name: 'name',
                        type: 'string',
                        displayName: 'Nom',
                        required: false,
                    },
                ],
            },
        ],
        onSubmitValid: (d) => {
            console.log(d);
            this.mainboardAPI
                .updateById(this.id, d.mainboard)
                .pipe(
                    notify({
                        title: 'Mainboard modifié',
                        body: () => `${this.id}`,
                    }),
                )
                .toPromise()
                .then(() => {});
        },
    };

    moduleWhere: Where<GrowbeModule>;
    moduleIncludes: Include[] = [{ relation: 'moduleDef' }];
    moduleColumns: TableColumn[] = [
        {
            id: 'uid',
            title: 'UID',
            content: (c) => c.uid,
        },
        {
            id: 'name',
            title: 'Name',
            content: (c) => c.moduleDef?.name,
        },
    ];

    warningColumns: TableColumn[] = [
        {
            id: 'type',
            title: 'Type',
            content: (w) => w.warningKeyId,
        },
    ];

    sub: Subscription;

    streamSelected: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        public mainboardAPI: GrowbeMainboardAPI,
        private growbeEventService: GrowbeEventService,
    ) {}

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.data.mainboard?.id;

        if (!this.id) {
            return;
        }

        this.mainboard = this.mainboardAPI.getById(this.id);

        this.moduleWhere = { mainboardId: this.id };

        this.sub = this.growbeEventService
            .getGrowbeEvent(this.id, '/cloud/m/+/state', JSON.parse)
            .subscribe((state) => {
                const index = this.table.dataSource.data.findIndex(
                    (x) => x.uid === state.uid,
                );
                if (index === -1) {
                    this.table.refreshData();
                }
            });
    }

    ngAfterViewInit() {}

    onStreamSelected(stream: any) {
        this.streamSelected = stream;
    }
}
