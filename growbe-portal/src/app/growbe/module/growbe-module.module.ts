import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleSelectComponent } from './component/growbe-module-select/growbe-module-select.component';
import { GrowbeModuleFieldSelectComponent } from './component/growbe-module-field-select/growbe-module-field-select.component';



@NgModule({
  declarations: [GrowbeModuleSelectComponent, GrowbeModuleFieldSelectComponent],
  imports: [
    CommonModule
  ]
})
export class GrowbeModuleModule { }
