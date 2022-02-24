import { Directive, Input, OnInit } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { Subscription, merge } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { GrowbeModuleAPI } from '../../api/growbe-module';
import { GrowbeEventService } from '../../services/growbe-event.service';
import { GrowbeGraphService } from '../graph/service/growbe-graph.service';

@Directive({})
@unsubscriber
export class BaseSVGModuleComponent implements OnInit {
    @Input() mainboardId: string;
    @Input() moduleId: string;

    data: any;

    sub: Subscription;


    extraProperties: string[];

    constructor(
        private topic: GrowbeEventService,
        private moduleAPI: GrowbeModuleAPI,
        private graphService: GrowbeGraphService,
    ) {}

    ngOnInit(): void {
        merge(
            this.moduleAPI
                .moduleDef(this.moduleId)
                .get()
                .pipe(
                    switchMap((moduleDef: any) =>
                        this.graphService
                            .getGraph(this.mainboardId, 'one', {
                                moduleId: this.moduleId,
                                growbeId: this.mainboardId,
                                fields: [...Object.keys(moduleDef.properties), ...(this.extraProperties || [])],
                                liveUpdate: true,
                            })
                            .pipe(map((items) => items[0])),
                    ),
                ),
            this.topic.getGrowbeEvent(
                this.mainboardId,
                `/cloud/m/${this.moduleId}/data`,
                (d) => Object.assign(JSON.parse(d), { createdAt: new Date() }),
            ),
        ).subscribe((data) => {
          (this.data = data)
        });
    }
}
