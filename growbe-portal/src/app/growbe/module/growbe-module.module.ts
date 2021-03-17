import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleSelectComponent } from './component/growbe-module-select/growbe-module-select.component';
import { GrowbeModuleFieldSelectComponent } from './component/growbe-module-field-select/growbe-module-field-select.component';
import { ModuleListComponent } from './component/module-list/module-list.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { ModuleStatusDotComponent } from './component/module-status-dot/module-status-dot.component';



@NgModule({
  declarations: [GrowbeModuleSelectComponent, GrowbeModuleFieldSelectComponent, ModuleListComponent, ModuleStatusDotComponent],
  imports: [
    CommonModule,

    AutoTableModule,
  ],
  exports: [ModuleListComponent]
})
export class GrowbeModuleModule { }
