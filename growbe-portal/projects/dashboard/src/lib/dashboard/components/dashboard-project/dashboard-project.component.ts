import { Component } from '@angular/core';
import { fuseAnimations } from '@berlingoqc/fuse';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { ProjectDashboard } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';
import { BaseDashboardComponent } from '../base-dashboard.component';

@Component({
    selector: 'app-dashboard-project',
    templateUrl: './dashboard-project.component.html',
    styleUrls: ['./dashboard-project.component.scss'],
    animations: fuseAnimations,
})
@unsubscriber
export class DashboardProjectComponent extends BaseDashboardComponent<ProjectDashboard> {
    constructor(dashboardService: DashboardService) {
      super(dashboardService);
    }
}
