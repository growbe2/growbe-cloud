import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeDynamicDashboardComponent } from './growbe-dynamic-dashboard/growbe-dynamic-dashboard.component';

import {
    ProjectDashboardModule,
    LayoutDirectiveModule,
} from '@berlingoqc/fuse-extra';
import { GrowbeDashboardRoutingModule } from './growbe-dashboard.routing';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { GraphModule } from '../module/graph/graph.module';
import { FuseSharedModule, FuseWidgetModule } from '@berlingoqc/fuse';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { GrowbeDashboardItemComponent } from './growbe-dashboard-item/growbe-dashboard-item.component';
import { GrowbeDashboardFormComponent } from './growbe-dashboard-form/growbe-dashboard-form.component';
import { GrowbeDashboardItemFormComponent } from './growbe-dashboard-item-form/growbe-dashboard-item-form.component';
import { GrowbeDashboardHomeComponent } from './growbe-dashboard-home/growbe-dashboard-home.component';

import { GraphSearchBarModule } from '../module/graph/graph-search-bar/graph-search-bar.module';

import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { GrowbeMainboardModule } from '../growbe-mainboard/growbe-mainboard.module';

@NgModule({
    declarations: [
        GrowbeDynamicDashboardComponent,
        GrowbeDashboardItemComponent,
        GrowbeDashboardFormComponent,
        GrowbeDashboardItemFormComponent,
        GrowbeDashboardHomeComponent,
    ],
    imports: [
        CommonModule,
        ProjectDashboardModule,
        LayoutDirectiveModule,

        GraphModule,
        GraphSearchBarModule,
        GrowbeMainboardModule,

        FuseWidgetModule,
        FuseSharedModule,

        AutoFormModule,

        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        GrowbeDashboardRoutingModule,
    ],
})
export class GrowbeDashboardModule {}
