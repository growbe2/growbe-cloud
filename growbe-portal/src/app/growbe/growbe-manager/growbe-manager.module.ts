import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeManagerDashboardComponent } from './growbe-manager-dashboard/growbe-manager-dashboard.component';
import { GrowbeMainboardModule } from '../growbe-mainboard/growbe-mainboard.module';
import { GrowbeManagerRoutingModule } from './growbe-manager.routing';

import {PageLayoutModule} from '@berlingoqc/fuse-extra';
import { GraphModule } from '../module/graph/graph.module';
import { GrowbeManagerDetailComponent } from './growbe-manager-detail/growbe-manager-detail.component';


@NgModule({
  declarations: [GrowbeManagerDashboardComponent, GrowbeManagerDetailComponent],
  imports: [
    CommonModule,

    PageLayoutModule,

    GrowbeManagerRoutingModule,

    GrowbeMainboardModule,
    GraphModule,
  ]
})
export class GrowbeManagerModule { }
