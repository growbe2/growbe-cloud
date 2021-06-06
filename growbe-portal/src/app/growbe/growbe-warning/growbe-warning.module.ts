import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningTableComponent } from './warning-table/warning-table.component';
import { WarningRtcComponent } from './warning-rtc/warning-rtc.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { WarningActionComponent } from './warning-action/warning-action.component';
import { TemplateContentModule } from '@berlingoqc/ngx-common';
import { LoopbackRestPipeModule } from '@berlingoqc/ngx-loopback';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';

@NgModule({
    declarations: [
        WarningTableComponent,
        WarningRtcComponent,
        WarningActionComponent,
    ],
    imports: [
        CommonModule,
        AutoFormModule,
        AutoTableModule,
        TemplateContentModule,
        LoopbackRestPipeModule,
    ],
    exports: [WarningTableComponent],
})
export class GrowbeWarningModule {}
