import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleDashboardComponent } from './growbe-module-dashboard.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { GraphModule } from '../graph/graph.module';
import { UnitModule } from 'src/app/shared/unit/unit.module';
import { GrowbeModuleModule } from '../growbe-module.module';



@NgModule({
  declarations: [GrowbeModuleDashboardComponent],
  imports: [
    CommonModule,

    DashboardModule,
    GraphModule,
    UnitModule,
    GrowbeModuleModule
  ]
})
export class GrowbeModuleDashboardModule { }
