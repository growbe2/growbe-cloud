import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleSensorValueGraphComponent } from './module-sensor-value-graph/module-sensor-value-graph.component';
import { GraphSearchBarComponent } from './graph-search-bar/graph-search-bar.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GrowbeGraphService } from './service/growbe-graph.service';

import { FuseWidgetModule } from '@berlingoqc/fuse';
import { WidgetModuleGraphComponent } from './widget-module-graph/widget-module-graph.component';
import { ModuleLastValueComponent } from './module-last-value/module-last-value.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ModuleSensorValueGraphComponent, WidgetModuleGraphComponent, ModuleLastValueComponent],
  imports: [
    CommonModule,

    MatIconModule,

    FuseWidgetModule,

    NgxChartsModule,
  ],
  providers: [GrowbeGraphService],
  exports: [ModuleSensorValueGraphComponent, WidgetModuleGraphComponent, ModuleLastValueComponent],
})
export class GraphModule { }
