import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Dashboard } from '../../dashboard.model';
import { BaseDashboardComponent } from '../base-dashboard.component';

@Component({
  selector: 'app-dashboard-one',
  templateUrl: './dashboard-one.component.html',
  styleUrls: ['./dashboard-one.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardOneComponent extends BaseDashboardComponent<Dashboard> {}
