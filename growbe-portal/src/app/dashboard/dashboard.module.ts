import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardItemComponent, ItemContentDirective } from './components/dashboard-item/dashboard-item.component';
import { DashboardPanelComponent } from './components/dashboard-panel/dashboard-panel.component';
import { LayoutDirectiveModule, ProjectDashboardModule } from '@berlingoqc/fuse-extra';
import { FuseSharedModule, FuseWidgetModule } from '@berlingoqc/fuse';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardRegistryService } from './registry/dashboard-registry.service';
import { DashboardProjectComponent } from './components/dashboard-project/dashboard-project.component';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [DashboardItemComponent, DashboardPanelComponent, DashboardProjectComponent, ItemContentDirective],
  imports: [
    CommonModule,
    ProjectDashboardModule,
    LayoutDirectiveModule,

    FuseWidgetModule,
    FuseSharedModule,

    MatGridListModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [DashboardRegistryService],
  exports: [DashboardPanelComponent, DashboardProjectComponent, DashboardItemComponent]
})
export class DashboardModule { }
