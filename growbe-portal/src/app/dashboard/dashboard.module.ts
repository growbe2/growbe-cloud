import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
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


@NgModule()
export class NullDashboardModule {
  constructor(
    @Optional()
    @Inject(DASHBOARDS_ITEM_DEFAULT) items: DashboardRegistryItem[],
    private registrty: DashboardRegistryService
  ) {
    if (items) items.forEach((item) => this.registrty.addItem(item));
  }
}

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
  static forRoot(items: DashboardRegistryItem[]): ModuleWithProviders<NullDashboardModule> {
    return {
      ngModule: NullDashboardModule,
      providers: [
        DashboardRegistryService,
        {
          provide: DASHBOARDS_ITEM_DEFAULT,
          useValue: items,
        }
      ]
    }
  }
}
