import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelayUnitControlComponent } from './relay-unit-control/relay-unit-control.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RelayBaseControlComponent } from './relay-base-control/relay-base-control.component';



@NgModule({
  declarations: [
    RelayUnitControlComponent,
    RelayBaseControlComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,

    MatSlideToggleModule
  ],
  exports: [
    RelayUnitControlComponent,
    RelayBaseControlComponent,
  ]
})
export class RelayModule { }
