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


  state: string = 'DISCONNECTED';

  rtcOff: boolean;

  hearthBeathAt: Date;
  hearthBeathRtc: Date;


  private timer: any;

  constructor(
    private growbeEventService: GrowbeEventService,
    private growbeConfigService: GrowbeConfigService,
  ) { }

  async ngOnInit() {
    this.state = this.growbe.state;


    (await this.growbeEventService.getGrowbeEvent(this.growbe.id, '/board/state', (d) => JSON.parse(d))).subscribe((event) => {
      this.state = event.state;
    });
  }


}
