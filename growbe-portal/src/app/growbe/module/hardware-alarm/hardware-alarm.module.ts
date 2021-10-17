import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableLayoutModule } from 'src/app/shared/table-layout/table-layout.module';
import { HardwareAlarmTableComponent } from './hardware-alarm-table.component';



@NgModule({
  declarations: [
    HardwareAlarmTableComponent,
  ],
  imports: [
    CommonModule,
    TableLayoutModule,
  ],
  exports: [
    HardwareAlarmTableComponent
  ],
})
export class HardwareAlarmModule { }
