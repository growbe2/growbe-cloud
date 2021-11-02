import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelayUnitControlComponent } from './relay-unit-control/relay-unit-control.component';



@NgModule({
  declarations: [
    RelayUnitControlComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RelayUnitControlComponent,
  ]
})
export class RelayModule { }
