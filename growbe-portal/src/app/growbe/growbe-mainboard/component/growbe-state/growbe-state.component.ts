import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

import * as pb from '@growbe2/growbe-pb';
import { take } from 'rxjs/operators';
import { GrowbeMainboard } from '@growbe2/ngx-cloud-api';

@Component({
  selector: 'app-growbe-state',
  templateUrl: './growbe-state.component.html',
  styleUrls: ['./growbe-state.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GrowbeStateComponent implements OnInit, OnDestroy {

  @Input() data: GrowbeMainboard;

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
    this.growbe = await this.mainboardAPI.getById(this.data.id).pipe(take(1)).toPromise();
    this.sub = (await this.topic.getGrowbeEvent(this.data.id, '/heartbeath', (d) => pb.HearthBeath.decode(d))).subscribe((beath) => {
      this.growbe.lastUpdateAt = beath;
      this.pulsingText.pulsing = true;
    });
  }

  ngOnDestroy() {
    if(this.sub) this.sub.unsubscribe();
  }


}
