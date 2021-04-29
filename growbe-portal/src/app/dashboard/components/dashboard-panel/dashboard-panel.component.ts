import { Component, HostBinding, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardPanel } from '../../dashboard.model';

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

  constructor() { }

  ngOnInit(): void {
    if (!this.panel) return;
    this.classes = this.panel.class
  }

}
