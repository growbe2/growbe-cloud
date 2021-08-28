import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations, FuseSidebarService } from '@berlingoqc/fuse';
import { GrowbeDashboard } from 'growbe-cloud-api/lib';

@Component({
    selector: 'app-growbe-dynamic-dashboard',
    templateUrl: './growbe-dynamic-dashboard.component.html',
    styleUrls: ['./growbe-dynamic-dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GrowbeDynamicDashboardComponent implements OnInit {
    data: GrowbeDashboard;

    constructor(
        private fuseSidebarService: FuseSidebarService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.data = this.activatedRoute.snapshot.data.dashboard;
        this.data.panels.forEach((panel) => {
          panel.items.forEach((item) => {
            item.dashboardEdit = true;
          })
        });
    }

    toggleSidebar(name): void {
        const sidebar = this.fuseSidebarService.getSidebar(name);
        sidebar.toggleOpen();
    }
}
