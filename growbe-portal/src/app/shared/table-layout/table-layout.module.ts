import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { AutoFormModule } from "@berlingoqc/ngx-autoform";
import { AutoTableModule } from "@berlingoqc/ngx-autotable";
import { CommonPipeModule } from "@berlingoqc/ngx-common";
import { TableLayoutComponent } from './table-layout/table-layout.component';


@NgModule({
  declarations: [
    TableLayoutComponent
  ],
  imports: [
    CommonModule,
    AutoTableModule,
    AutoFormModule,
    CommonPipeModule,

    MatIconModule,
    MatButtonModule,
  ],
})
export class TableLayoutModule {

}
