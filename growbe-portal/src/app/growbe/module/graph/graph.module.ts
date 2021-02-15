import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleSensorValueGraphComponent } from './module-sensor-value-graph/module-sensor-value-graph.component';
import { GraphSearchBarComponent } from './graph-search-bar/graph-search-bar.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GrowbeGraphService } from './service/growbe-graph.service';

import { FuseWidgetModule } from '@berlingoqc/fuse';
import { WidgetModuleGraphComponent } from './widget-module-graph/widget-module-graph.component';

@NgModule({
  declarations: [ModuleSensorValueGraphComponent, GraphSearchBarComponent, WidgetModuleGraphComponent],
  imports: [
    CommonModule,

    FuseWidgetModule,

    NgxChartsModule,
  ],
  providers: [GrowbeGraphService],
  exports: [ModuleSensorValueGraphComponent, WidgetModuleGraphComponent],
})
export class GraphModule { }
