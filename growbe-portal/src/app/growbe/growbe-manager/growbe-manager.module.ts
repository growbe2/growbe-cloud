import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeManagerDashboardComponent } from './growbe-manager-dashboard/growbe-manager-dashboard.component';
import { GrowbeMainboardModule } from '../growbe-mainboard/growbe-mainboard.module';
import { GrowbeManagerRoutingModule } from './growbe-manager.routing';

import {LayoutDirectiveModule, PageLayoutModule, ProjectDashboardModule} from '@berlingoqc/fuse-extra';
import { GraphModule } from '../module/graph/graph.module';
import { GrowbeManagerDetailComponent } from './growbe-manager-detail/growbe-manager-detail.component';
import { FuseWidgetModule } from '@berlingoqc/fuse';
import { MatTabsModule } from '@angular/material/tabs';
import { GrowbeModuleModule } from '../module/growbe-module.module';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';


@NgModule({
  declarations: [GrowbeManagerDashboardComponent, GrowbeManagerDetailComponent],
  imports: [
    CommonModule,

    PageLayoutModule,


    AutoTableModule,
    AutoFormModule,

    GrowbeManagerRoutingModule,

    GrowbeModuleModule,
    GrowbeMainboardModule,
    GraphModule,

    MatTabsModule,

    ProjectDashboardModule,
    LayoutDirectiveModule,

    FuseWidgetModule,
  ]
})
export class GrowbeManagerModule { }
