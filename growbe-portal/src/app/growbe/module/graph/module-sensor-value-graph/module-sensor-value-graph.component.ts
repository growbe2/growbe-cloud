import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { THLModuleData } from '@growbe2/growbe-pb';
import { Subscription } from 'rxjs';
import { DashboardGraphElement } from '@growbe2/ngx-cloud-api';

@Component({
  selector: 'app-module-sensor-value-graph',
  templateUrl: './module-sensor-value-graph.component.html',
  styleUrls: ['./module-sensor-value-graph.component.scss'],
})
export class ModuleSensorValueGraphComponent implements OnInit, OnDestroy {
  @Input() data: DashboardGraphElement;

  chartSerie;

  sub: Subscription;

  get chart() {
    return this.data.graphConfig;
  }
  constructor(
    private graphService: GrowbeGraphService,
    private topic: GrowbeEventService,
  ) {}

  async ngOnInit() {
    if (!this.data) {
      return;
    }
    this.graphService.getGraph(this.data.type, this.data.graphDataConfig)
      .subscribe((serie) => (this.chartSerie = serie));
    if (this.data.graphDataConfig.liveUpdate) {
      this.sub = this.topic.getGrowbeEvent(
          this.data.graphDataConfig.growbeId,
          `/cloud/m/${this.data.graphDataConfig.moduleId}/data`,
          (d) => JSON.parse(d)
      ).subscribe((data) => {
        if (data) {
          for (const field of this.data.graphDataConfig.fields) {
            const index = this.chartSerie.findIndex((i) => i.name === field);
            if (index == -1) {
              console.log('NOT INDEX');
              continue;
            }
            const item = {
              name: (new Date()).toLocaleString(),
              value: data[field]
            };
            const serie = this.chartSerie;
            serie[index].series.push(item);
            this.chartSerie = [...serie];

          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
