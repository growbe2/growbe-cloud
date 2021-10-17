import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Dashboard } from '../../dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  @Input() dashboard: Dashboard;
}
