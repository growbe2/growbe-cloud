import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { GraphSearchBarComponent } from './graph-search-bar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SelectControlModule } from '@berlingoqc/ngx-common';


@NgModule({
  declarations: [GraphSearchBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,

    SelectControlModule,
  ],
  exports: [GraphSearchBarComponent],
})
export class GraphSearchBarModule { }
