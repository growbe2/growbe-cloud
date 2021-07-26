import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleDashboardComponent } from './growbe-module-dashboard.component';
import { DashboardModule } from '@growbe2/growbe-dashboard';
import { GraphModule } from '../graph/graph.module';
import { UnitModule } from 'src/app/shared/unit/unit.module';
import { GrowbeModuleModule } from '../growbe-module.module';
import { TimeframeModule } from 'src/app/shared/timeframe/timeframe.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { TableLayoutModule } from 'src/app/shared/table-layout/table-layout.module';

@NgModule({
    declarations: [GrowbeModuleDashboardComponent],
    imports: [
        CommonModule,

        MatChipsModule,
        MatToolbarModule,
        TimeframeModule,
        DashboardModule,
        GraphModule,
        UnitModule,
        GrowbeModuleModule,
        TableLayoutModule,
    ],
})
export class GrowbeModuleDashboardModule {}
