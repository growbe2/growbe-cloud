import { Inject, ModuleWithProviders, NgModule, Optional, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardItemComponent, DashboardItemRegistryCopyDirective, ItemContentDirective } from './components/dashboard-item/dashboard-item.component';
import { DashboardPanelComponent } from './components/dashboard-panel/dashboard-panel.component';
import { LayoutDirectiveModule, ProjectDashboardModule } from '@berlingoqc/fuse-extra';
import { FuseSharedModule, FuseWidgetModule } from '@berlingoqc/fuse';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DashboardRegistryService, DASHBOARDS_ITEM_DEFAULT } from './registry/dashboard-registry.service';
import { DashboardProjectComponent } from './components/dashboard-project/dashboard-project.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardRegistryItem } from './registry/dashboard.registry';
import { DashboardService } from './dashboard.service';



@NgModule({
  declarations: [DashboardItemComponent, DashboardPanelComponent, DashboardProjectComponent, ItemContentDirective, DashboardItemRegistryCopyDirective],
  imports: [
    CommonModule,
    ProjectDashboardModule,
    LayoutDirectiveModule,

    AutoFormModule,

    FuseWidgetModule,
    FuseSharedModule,

    MatGridListModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [DashboardPanelComponent, DashboardProjectComponent, DashboardItemComponent]
})
export class DashboardModule {
  static forRoot(service: Type<DashboardService>): ModuleWithProviders<DashboardModule> {
    return {
      ngModule: DashboardModule,
      providers: [
        DashboardRegistryService,
        {
          provide: DashboardService,
          useClass: service,
        }
      ]
    }
  }
}
