import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleSensorValueGraphComponent } from './module-sensor-value-graph/module-sensor-value-graph.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { GrowbeGraphService } from './service/growbe-graph.service';

import { FuseWidgetModule } from '@berlingoqc/fuse';
import { WidgetModuleGraphComponent } from './widget-module-graph/widget-module-graph.component';
import { ModuleLastValueComponent } from './module-last-value/module-last-value.component';
import { MatIconModule } from '@angular/material/icon';
import { ModuleGraphBuilderComponent } from './module-graph-builder/module-graph-builder.component';
import { GrowbeModuleModule } from '../growbe-module.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { TemplateContentModule } from '@berlingoqc/ngx-common';
import { ModulePipeModule } from '../pipes/module-pipe.module';
import { DatedValueModule } from 'src/app/shared/dated-value/dated-value.module';

@NgModule({
    declarations: [
        ModuleSensorValueGraphComponent,
        WidgetModuleGraphComponent,
        ModuleLastValueComponent,
        ModuleGraphBuilderComponent,
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        AutoFormModule,
        FuseWidgetModule,
        NgxChartsModule,
        GrowbeModuleModule,

        ModulePipeModule,

        TemplateContentModule,
        DatedValueModule,
    ],
    providers: [GrowbeGraphService],
    exports: [
        ModuleSensorValueGraphComponent,
        WidgetModuleGraphComponent,
        ModuleLastValueComponent,
        ModuleGraphBuilderComponent,
    ],
})
export class GraphModule {}
