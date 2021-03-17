import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { THLModuleData } from '@growbe2/growbe-pb';

@Component({
  selector: 'app-module-last-value',
  templateUrl: './module-last-value.component.html',
  styleUrls: ['./module-last-value.component.scss']
})
export class ModuleLastValueComponent implements OnInit, OnDestroy {

  @Input() data: any;

  sub: Subscription;

  value: number;
  lastValue: number;

  historic: number[] = [];


  constructor(
    private topic: GrowbeEventService,
    private graphService: GrowbeGraphService,
  ) { }

  ngOnInit(): void {
    this.graphService.getGraph('lastread', this.data.graphDataConfig).subscribe(async (data) => {
      this.value = data[this.data.graphDataConfig.fields[0]];
      if(this.data.graphDataConfig.liveUpdate) {
        this.sub = (
        await this.topic.getGrowbeEvent(
          this.data.graphDataConfig.growbeId,
          `/${this.data.graphDataConfig.moduleType}`,
          (d) => THLModuleData.decode(d)
        )
      ).subscribe((data) => {
        if(data) {
          this.lastValue = this.value
          this.historic.push(this.lastValue);
          this.value = data[this.data.graphDataConfig.fields[0]]
        }
      });
    }
    })
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }

}
