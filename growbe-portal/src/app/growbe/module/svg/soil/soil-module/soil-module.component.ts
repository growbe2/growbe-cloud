import { Component, Input, OnInit } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { BaseSVGModuleComponent } from '../../base-svg-module.component';

@Component({
  selector: 'app-soil-module',
  templateUrl: './soil-module.component.svg',
  styleUrls: ['./soil-module.component.scss']
})
@unsubscriber
export class SoilModuleComponent extends BaseSVGModuleComponent {}
