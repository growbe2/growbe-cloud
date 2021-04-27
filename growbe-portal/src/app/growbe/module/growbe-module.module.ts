import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleSelectComponent } from './component/growbe-module-select/growbe-module-select.component';
import { GrowbeModuleFieldSelectComponent } from './component/growbe-module-field-select/growbe-module-field-select.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { ModuleStatusDotComponent } from './component/module-status-dot/module-status-dot.component';
import { GrowbeModuleDataTableComponent } from './component/growbe-module-data-table/growbe-module-data-table.component';
import { GrowbeModuleDefComponent } from './component/growbe-module-def/growbe-module-def.component';
import { GrowbeModuleDetailComponent } from './component/growbe-module-detail/growbe-module-detail.component';
import { MatListModule } from '@angular/material/list';
import { FuseWidgetModule } from '@berlingoqc/fuse';
import { LoopbackRestPipeModule } from '@berlingoqc/ngx-loopback';
import { ButtonsRowModule } from 'src/app/shared/buttons-row/buttons-row.module';
import { GraphModule } from './graph/graph.module';
import { UnitModule } from 'src/app/shared/unit/unit.module';

@NgModule({
    declarations: [
        GrowbeModuleSelectComponent,
        GrowbeModuleFieldSelectComponent,
        ModuleStatusDotComponent,
        GrowbeModuleDataTableComponent,
        GrowbeModuleDefComponent,
        GrowbeModuleDetailComponent,
    ],
    imports: [
        CommonModule,
        MatListModule,
        FuseWidgetModule,
        GraphModule,
        UnitModule,
        AutoTableModule,
        ButtonsRowModule,
        LoopbackRestPipeModule,
    ],
    exports: [ModuleStatusDotComponent],
})
export class GrowbeModuleModule {}
