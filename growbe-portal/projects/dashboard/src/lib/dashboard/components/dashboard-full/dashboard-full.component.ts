import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Dashboard } from '../../dashboard.model';
import { BaseDashboardComponent } from '../base-dashboard.component';

@Component({
  selector: 'app-dashboard-full',
  templateUrl: './dashboard-full.component.html',
  styleUrls: ['./dashboard-full.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardFullComponent extends BaseDashboardComponent<Dashboard> {}
