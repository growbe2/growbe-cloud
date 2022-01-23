import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualRelayControlComponent } from './virtual-relay-control/virtual-relay-control.component';
import { VirtualRelayTableComponent } from './virtual-relay-table/virtual-relay-table.component';



@NgModule({
  declarations: [
    VirtualRelayControlComponent,
    VirtualRelayTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VirtualRelayControlComponent,
    VirtualRelayTableComponent,
  ]
})
export class VirtualRelayModule { }
