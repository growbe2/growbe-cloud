import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeframeSelectComponent } from './timeframe-select/timeframe-select.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { RouterModule } from '@angular/router';
import { TimeframeGroupingSelectFormComponent } from './timeframe-grouping-select-form/timeframe-grouping-select-form.component';

@NgModule({
    declarations: [TimeframeSelectComponent, TimeframeGroupingSelectFormComponent],
    imports: [CommonModule, MatTabsModule, RouterModule, AutoFormModule],
    exports: [TimeframeSelectComponent, TimeframeGroupingSelectFormComponent],
})
export class TimeframeModule {}
