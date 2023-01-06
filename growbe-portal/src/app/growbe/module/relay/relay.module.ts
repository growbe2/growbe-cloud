import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelayUnitControlComponent } from './relay-unit-control/relay-unit-control.component';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySlideToggle as MatSlideToggle, MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { RelayBaseControlComponent } from './relay-base-control/relay-base-control.component';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';


@NgModule({
  declarations: [
    RelayUnitControlComponent,
    RelayBaseControlComponent
  ],
  imports: [
    CommonModule,

    AutoFormModule,

    MatChipsModule,
    MatIconModule,

    MatSlideToggleModule
  ],
  exports: [
    RelayUnitControlComponent,
    RelayBaseControlComponent,
  ]
})
export class RelayModule { }
