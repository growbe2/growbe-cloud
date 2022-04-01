import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleSelectComponent } from './component/growbe-module-select/growbe-module-select.component';
import { GrowbeModuleFieldSelectComponent } from './component/growbe-module-field-select/growbe-module-field-select.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { ModuleStatusDotComponent } from './component/module-status-dot/module-status-dot.component';
import { GrowbeModuleDataTableComponent } from './component/growbe-module-data-table/growbe-module-data-table.component';
import { GrowbeModuleDefComponent } from './component/growbe-module-def/growbe-module-def.component';
import { MatListModule } from '@angular/material/list';

import { FuseWidgetModule } from '@berlingoqc/fuse';
import { LoopbackRestPipeModule } from '@berlingoqc/ngx-loopback';
import { UnitModule } from 'src/app/shared/unit/unit.module';
import { GrowbeModuleConfigComponent } from './component/growbe-module-config/growbe-module-config.component';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { HardwareAlarmModule } from './hardware-alarm/hardware-alarm.module';
import { ButtonsRowModule, ConfirmationModule } from '@berlingoqc/ngx-common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatedValueModule } from 'src/app/shared/dated-value/dated-value.module';

@NgModule({
    declarations: [
        GrowbeModuleSelectComponent,
        GrowbeModuleFieldSelectComponent,
        ModuleStatusDotComponent,
        GrowbeModuleDataTableComponent,
        GrowbeModuleDefComponent,
        GrowbeModuleConfigComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        FuseWidgetModule,
        UnitModule,
        AutoTableModule,
        AutoFormModule,
        ButtonsRowModule,
        HardwareAlarmModule,
        LoopbackRestPipeModule,
        DatedValueModule,
    ],
    exports: [ModuleStatusDotComponent],
})
export class GrowbeModuleModule {}
