import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutdatedValueComponent } from './outdated-value/outdated-value.component';
import { MatIconModule } from '@angular/material/icon';
import {TimestampPipe} from './timestamp.pipe';



@NgModule({
  declarations: [
    OutdatedValueComponent,
    TimestampPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    OutdatedValueComponent,
    TimestampPipe,
  ]
})
export class DatedValueModule { }
