import { Component, Input, OnInit } from '@angular/core';
import { fuseAnimations } from '@berlingoqc/fuse';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { unsubscriber } from '@berlingoqc/ngx-common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { addPanelForm } from '../../dashboard.form';
import { Dashboard, ProjectDashboard } from '../../dashboard.model';
import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'app-dashboard-project',
    templateUrl: './dashboard-project.component.html',
    styleUrls: ['./dashboard-project.component.scss'],
    animations: fuseAnimations,
})
@unsubscriber
export class DashboardProjectComponent implements OnInit {
    @Input() projectDashboard: ProjectDashboard;

    sub: Subscription;

    newPanelForm: AutoFormData;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit(): void {
        this.sub = this.dashboardService.dashboardSubject
            .asObservable()
            .pipe(
                filter((d: Dashboard) => d.name === this.projectDashboard.name),
            )
            .subscribe((dashboard) => {
                this.projectDashboard = dashboard;
            });

        this.newPanelForm = addPanelForm(this.dashboardService, {
            dashboardId: this.projectDashboard.id,
        });
    }
}