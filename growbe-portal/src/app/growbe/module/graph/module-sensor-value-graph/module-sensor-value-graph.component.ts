import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { THLModuleData } from '@growbe2/growbe-pb';
import { Subscription } from 'rxjs';
import { DashboardGraphElement } from '@growbe2/ngx-cloud-api';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';

@Component({
    selector: 'app-module-sensor-value-graph',
    templateUrl: './module-sensor-value-graph.component.html',
    styleUrls: ['./module-sensor-value-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModuleSensorValueGraphComponent implements OnInit, OnDestroy {
    @Input() data: DashboardGraphElement & { includeAlarms: boolean };

    chartSerie;

    sub: Subscription;

    get chart() {
        return this.data.graphConfig;
    }
    constructor(
        private graphService: GrowbeGraphService,
        private topic: GrowbeEventService,
        private changeDetection: ChangeDetectorRef,
        private growbeMainboardAPI: GrowbeMainboardAPI,
    ) {}

    async ngOnInit() {
        this.data
        if (!this.data) {
            return;
        }
        if ((this.data.graphDataConfig as any).includeAlarms) {
          const relation = this.growbeMainboardAPI.hardwareAlarms(this.growbeMainboardAPI);
          relation.moduleId = this.data.graphDataConfig.moduleId;
          relation.get().subscribe((alarms) => {
            alarms.filter((v: any) => this.data.graphDataConfig.fields.includes(v.property)).map((v: any) => {
              this.data.graphConfig.referenceLines = [
                {
                  name: `${v.property}:low`,
                  value: v.low.value
                },
                {
                  name: `${v.property}:high`,
                  value: v.high.value
                }

              ];
              console.log('REFERENCES LINES FOR', v);
            });
          });
        }
        this.graphService
            .getGraph(this.data.graphDataConfig.growbeId,this.data.type, this.data.graphDataConfig)
            .subscribe((serie) => {
                this.chartSerie = serie;
                this.changeDetection.markForCheck();
            });
        if (this.data.graphDataConfig.liveUpdate) {
            this.sub = this.topic
                .getGrowbeEvent(
                    this.data.graphDataConfig.growbeId,
                    `/cloud/m/${this.data.graphDataConfig.moduleId}/data`,
                    (d) => JSON.parse(d),
                )
                .subscribe((data) => {
                    if (data) {
                        for (const field of this.data.graphDataConfig.fields) {
                            const index = this.chartSerie.findIndex(
                                (i) => i.name === field,
                            );
                            if (index === -1) {
                                continue;
                            }
                            const item = {
                                name: new Date().toLocaleString(),
                                value: data[field],
                            };
                            const serie = this.chartSerie;
                            serie[index].series.push(item);
                            this.chartSerie = [...serie];
                            this.changeDetection.markForCheck();
                        }
                    }
                });
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
