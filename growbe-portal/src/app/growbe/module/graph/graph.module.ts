import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleSensorValueGraphComponent } from './module-sensor-value-graph/module-sensor-value-graph.component';
import { GraphSearchBarComponent } from './graph-search-bar/graph-search-bar.component';



@NgModule({
  declarations: [ModuleSensorValueGraphComponent, GraphSearchBarComponent],
  imports: [
    CommonModule
  ]
})
export class GraphModule { }
