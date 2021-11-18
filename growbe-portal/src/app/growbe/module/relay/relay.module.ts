import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelayUnitControlComponent } from './relay-unit-control/relay-unit-control.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    RelayUnitControlComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,

    MatSlideToggleModule
  ],
  exports: [
    RelayUnitControlComponent,
  ]
})
export class RelayModule { }
