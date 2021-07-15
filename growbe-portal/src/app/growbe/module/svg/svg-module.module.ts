import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoilProbeComponent } from './soil/soil-probe/soil-probe.component';
import { SoilModuleComponent } from './soil/soil-module/soil-module.component';



@NgModule({
  declarations: [
    SoilProbeComponent,
    SoilModuleComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [SoilProbeComponent, SoilModuleComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SvgModuleModule { }
