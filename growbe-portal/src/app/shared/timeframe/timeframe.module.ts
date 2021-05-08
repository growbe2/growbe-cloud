import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeframeSelectComponent } from './timeframe-select/timeframe-select.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';



@NgModule({
  declarations: [TimeframeSelectComponent],
  imports: [
    CommonModule,
    MatTabsModule,

    AutoFormModule,
  ]
})
export class TimeframeModule { }
