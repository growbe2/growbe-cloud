import { Component, Input, OnInit } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { BaseSVGModuleComponent } from '../../base-svg-module.component';
import { ProbeValueStatusGetter } from '../soil-probe/soil-probe.component';

@Component({
  selector: 'app-soil-module',
  templateUrl: './soil-module.component.svg',
  styleUrls: ['./soil-module.component.scss']
})
@unsubscriber
export class SoilModuleComponent extends BaseSVGModuleComponent {
  extraProperties = ['valuetype'];
  statusGetter: ProbeValueStatusGetter = {
    getValueStatus: (v, type) => {
      if (type === 'calibrate') {
        if (v == -1) {
          return 'unknow';
        } else if (v >= 0 && v <= 100) {
          return 'ok';
        } else {
          return 'unknow';
        }
      } else {
        if ( v > 100 ) {
          return 'ok';
        } else {
          return 'unknow';
        }
      }
    }
  }
}
