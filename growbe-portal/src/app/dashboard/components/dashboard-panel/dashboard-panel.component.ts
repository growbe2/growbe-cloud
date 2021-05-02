import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardPanel } from '../../dashboard.model';
import { DashboardRef } from '../../dashboard.service';

@Component({
  selector: 'app-dashboard-panel',
  templateUrl: './dashboard-panel.component.html',
  styleUrls: ['./dashboard-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardPanelComponent implements OnInit {

  @HostBinding('class')
  classes: string[];

  @HostBinding('style')
  style: any;

  mPanel: DashboardPanel;
  @Input() set panel(p: DashboardPanel) {
    if (!p) return;
    this.mPanel = p;
    this.classes = p.class;
    this.style = Object.assign({
      width: '100%',
    }, p.style);
  }

  @Input() dashboard?: DashboardRef;

  constructor() { }

  ngOnInit(): void {}

}
