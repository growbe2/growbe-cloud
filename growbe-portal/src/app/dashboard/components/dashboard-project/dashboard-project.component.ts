import { Component, Input, OnInit } from '@angular/core';
import { fuseAnimations } from '@berlingoqc/fuse';
import { ProjectDashboard } from '../../dashboard.model';

@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.scss'],
  animations: fuseAnimations,
})
export class DashboardProjectComponent implements OnInit {

  @Input() projectDashboard: ProjectDashboard

  constructor() { }

  ngOnInit(): void {
  }

}
