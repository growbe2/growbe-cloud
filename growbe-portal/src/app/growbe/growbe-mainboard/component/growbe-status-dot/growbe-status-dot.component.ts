import { Component, Input, OnInit } from '@angular/core';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';

import {HearthBeath} from '@growbe2/growbe-pb';
import { GrowbeConfigService } from 'src/app/growbe/services/growbe-config.service';

@Component({
  selector: 'app-growbe-status-dot',
  templateUrl: './growbe-status-dot.component.html',
  styleUrls: ['./growbe-status-dot.component.scss'],
  animations: []
})
export class GrowbeStatusDotComponent implements OnInit {

  @Input() growbe: any;


  state: string = 'disconnected';

  rtcOff: boolean;

  hearthBeathAt: Date;
  hearthBeathRtc: Date;


  private timer: any;

  constructor(
    private growbeEventService: GrowbeEventService,
    private growbeConfigService: GrowbeConfigService,
  ) { }

  async ngOnInit() {
    if(this.growbe?.lastUpdateAt?.rtc) {
      this.state = 'waiting';
      this.hearthBeathAt = new Date(this.growbe.lastUpdateAt.rtc);
    } else {
      this.state = 'disconnected';
    }

    this.timer = setInterval(() => {
      if(this.state === 'waiting')
        this.state = 'disconnected';
      if(this.state === 'connected') {
        // si le temps est supperieur a hearthBeathRate
      }
    }, this.growbeConfigService.hearthBeathRate * 1000);


    (await this.growbeEventService.getGrowbeEvent(this.growbe.id, '/heartbeath', HearthBeath)).subscribe((event) => {
      this.state = 'connected';
      this.growbe.lastUpdateAt = event;
    });
  }


}
