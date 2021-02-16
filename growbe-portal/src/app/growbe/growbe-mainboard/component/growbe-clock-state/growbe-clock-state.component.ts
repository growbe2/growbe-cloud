import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

import * as pb from '@growbe2/growbe-pb';

@Component({
  selector: 'app-growbe-clock-state',
  templateUrl: './growbe-clock-state.component.html',
  styleUrls: ['./growbe-clock-state.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GrowbeClockStateComponent implements OnInit, OnDestroy {

  @Input() data: any;

  growbe: any;

  sub;

  pulsingText = {

    pulsing: false

  }

  constructor(
    private mainboardAPI: GrowbeMainboardAPI,
    private topic: GrowbeEventService,
  ) { }

  async ngOnInit() {
    this.growbe = await this.mainboardAPI.getById(this.data.id).toPromise();
    this.sub = (await this.topic.getGrowbeEvent(this.data.id, '/heartbeath', (d) => pb.HearthBeath.decode(d))).subscribe((beath) => {
      this.growbe.lastUpdateAt = beath;
      this.pulsingText.pulsing = true;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}
