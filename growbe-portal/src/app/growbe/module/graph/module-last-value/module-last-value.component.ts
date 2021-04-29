import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { THLModuleData } from '@growbe2/growbe-pb';

@Component({
    selector: 'app-module-last-value',
    templateUrl: './module-last-value.component.html',
    styleUrls: ['./module-last-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleLastValueComponent implements OnInit, OnDestroy {
    @Input() data: any;

    sub: Subscription;

    value: number;
    lastValue: number;
    at: Date;

    historic: number[] = [];

    constructor(
        private topic: GrowbeEventService,
        private graphService: GrowbeGraphService,
        private changeDetection: ChangeDetectorRef,
    ) {}

    ngOnInit(): void {
        if (!this.data) {
            return;
        }
        this.graphService
            .getGraph('lastread', this.data.graphDataConfig)
            .subscribe(async (data: any) => {
                this.value = data[this.data.graphDataConfig.fields[0]];
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
                            this.value =
                                graphData[this.data.graphDataConfig.fields[0]];
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
}
