import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitComponent } from './unit/unit.component';



@NgModule({
  declarations: [UnitComponent],
  imports: [
    CommonModule
  ],
  exports: [UnitComponent],
})
export class UnitModule { }
