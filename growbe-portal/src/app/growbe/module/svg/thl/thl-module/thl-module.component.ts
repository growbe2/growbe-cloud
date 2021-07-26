
import { Component, Input, OnInit } from '@angular/core';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { BaseSVGModuleComponent } from '../../base-svg-module.component';

@Component({
  selector: 'app-thl-module',
  templateUrl: './thl-module.component.svg',
  styleUrls: ['./thl-module.component.scss']
})
export class THLModuleComponent extends BaseSVGModuleComponent {}
