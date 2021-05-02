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

  @Input() panel: DashboardPanel;

  @Input() dashboard?: DashboardRef;

  constructor() { }

  ngOnInit(): void {
    if (!this.panel) return;
    this.classes = this.panel.class
  }

}
