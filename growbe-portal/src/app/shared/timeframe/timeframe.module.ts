import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeframeSelectComponent } from './timeframe-select/timeframe-select.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [TimeframeSelectComponent],
    imports: [CommonModule, MatTabsModule, RouterModule, AutoFormModule],
    exports: [TimeframeSelectComponent],
})
export class TimeframeModule {}
