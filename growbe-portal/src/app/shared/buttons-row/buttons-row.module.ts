import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsRowComponent } from './buttons-row/buttons-row.component';
import { TemplateContentModule } from '@berlingoqc/ngx-common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ButtonsRowComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    TemplateContentModule,
  ],
  exports: [ButtonsRowComponent],
})
export class ButtonsRowModule { }
