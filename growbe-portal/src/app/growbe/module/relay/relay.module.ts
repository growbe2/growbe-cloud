import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelayUnitControlComponent } from './relay-unit-control/relay-unit-control.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RelayBaseControlComponent } from './relay-base-control/relay-base-control.component';
import { MatChipsModule } from '@angular/material/chips';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import {DatedValueModule} from 'src/app/shared/dated-value/dated-value.module';
import { RelayHistoricComponent } from './relay-historic/relay-historic.component';
import {AutoTableModule} from '@berlingoqc/ngx-autotable';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    RelayUnitControlComponent,
    RelayBaseControlComponent,
    RelayHistoricComponent
  ],
  imports: [
    CommonModule,

    AutoTableModule,
    AutoFormModule,

    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,

    MatSlideToggleModule,

    DatedValueModule,
  ],
  exports: [
    RelayUnitControlComponent,
    RelayBaseControlComponent,
  ]
})
export class RelayModule { }
