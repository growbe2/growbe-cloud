import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutdatedValueComponent } from './outdated-value/outdated-value.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    OutdatedValueComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    OutdatedValueComponent,
  ]
})
export class DatedValueModule { }
