import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteryItemComponent } from './registery-item/registery-item.component';
import { RegisteryStoreComponent } from './registery-store/registery-store.component';



@NgModule({
  declarations: [
    RegisteryItemComponent,
    RegisteryStoreComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RegisteryStoreComponent,
  ]
})
export class RegisteryStoreModule { }
