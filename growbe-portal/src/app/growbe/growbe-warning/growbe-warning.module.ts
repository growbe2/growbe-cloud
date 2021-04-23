import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarningTableComponent } from './warning-table/warning-table.component';
import { WarningRtcComponent } from './warning-rtc/warning-rtc.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';

@NgModule({
    declarations: [WarningTableComponent, WarningRtcComponent],
    imports: [CommonModule, AutoTableModule],
})
export class GrowbeWarningModule {}
