
import { Component, Input, OnInit } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { BaseSVGModuleComponent } from '../../base-svg-module.component';

@Component({
  selector: 'app-wc-module',
  templateUrl: './wc-module.component.svg',
  styleUrls: ['./wc-module.component.scss']
})
export class WCModuleComponent extends BaseSVGModuleComponent {}
