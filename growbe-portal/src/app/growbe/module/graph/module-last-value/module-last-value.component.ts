import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { THLModuleData } from '@growbe2/growbe-pb';
import { GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { map, take } from 'rxjs/operators';
import {
    GrowbeModuleDef,
    GrowbeModuleWithRelations,
} from '@growbe2/ngx-cloud-api';
import { DecimalPipe } from '@angular/common';
import { transformModuleValue } from '../../module.def';

@Component({
    selector: 'app-module-last-value',
    templateUrl: './module-last-value.component.html',
    styleUrls: ['./module-last-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DecimalPipe],
})
export class ModuleLastValueComponent implements OnInit, OnDestroy {
    @Input() data: any;

    @Input() moduleType?: string;

    sub: Subscription;

    moduleDef: Observable<GrowbeModuleDef>;

    value: any;

    lastValue: any;

    at: Date;
    historic: number[] = [];

    constructor(
        private topic: GrowbeEventService,
        private graphService: GrowbeGraphService,
        private changeDetection: ChangeDetectorRef,
        private moduleAPI: GrowbeModuleAPI,
        private numberPipe: DecimalPipe,
    ) {}

    ngOnInit(): void {
        if (!this.data) {
            return;
        }
        this.graphService
            .getGraph('lastread', this.data.graphDataConfig)
            .subscribe(async (data: any) => {
                this.moduleDef = this.moduleAPI
                    .get({
                        where: { uid: this.data.graphDataConfig.moduleId },
                        include: [{ relation: 'moduleDef' }],
                    })
                    .pipe(
                        map(
                            (modules: GrowbeModuleWithRelations[]) =>
                                modules[0].moduleDef,
                        ),
                    );
                this.value = this.transformValue(
                    data[this.data.graphDataConfig.fields[0]],
                );
                this.at = data.createdAt;
                this.changeDetection.markForCheck();
                if (this.data.graphDataConfig.liveUpdate) {
                    this.sub = (
                        await this.topic.getGrowbeEvent(
                            this.data.graphDataConfig.growbeId,
                            `/cloud/m/${this.data.graphDataConfig.moduleId}/data`,
                            (d) =>
                                Object.assign(JSON.parse(d), {
                                    createdAt: new Date(),
                                }),
                        )
                    ).subscribe((graphData) => {
                        if (graphData) {
                            this.lastValue = this.value;
                            this.historic.push(this.lastValue);
                            this.value = this.transformValue(
                                graphData[this.data.graphDataConfig.fields[0]],
                            );
                            this.at = graphData.createdAt;
                            this.changeDetection.markForCheck();
                        }
                    });
                }
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private transformValue(value) {
        value = transformModuleValue(this.moduleType, value);
        if (typeof value === 'number') {
            value = this.numberPipe.transform(value);
        }
        return value;
    }
}
