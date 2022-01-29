
import { Component, Input, OnInit } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { BaseSVGModuleComponent } from '../../base-svg-module.component';
import { ProbeValueStatusGetter } from '../../soil/soil-probe/soil-probe.component';

@Component({
  selector: 'app-thl-module',
  templateUrl: './thl-module.component.svg',
  styleUrls: ['./thl-module.component.scss']
})
export class THLModuleComponent extends BaseSVGModuleComponent {
   statusGetter: ProbeValueStatusGetter = {
    getValueStatus: (v) => {
      return 'ok'
    }
   }
}
