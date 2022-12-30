import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
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

    MatDialogModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [TableLayoutComponent],
})
export class TableLayoutModule {

}
