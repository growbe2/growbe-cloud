import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoilProbeComponent, AnimateMeDirective } from './soil/soil-probe/soil-probe.component';
import { SoilModuleComponent } from './soil/soil-module/soil-module.component';
import { THLModuleComponent } from './thl/thl-module/thl-module.component';
import { WCModuleComponent } from './wc/wc-module/wc-module.component';
import { ModuleSVGComponent } from './module-svg.component';
import { DatedValueModule } from 'src/app/shared/dated-value/dated-value.module';



@NgModule({
  declarations: [
    SoilProbeComponent,
    SoilModuleComponent,
    THLModuleComponent,
    WCModuleComponent,
    AnimateMeDirective,

    ModuleSVGComponent,
  ],
  imports: [
    CommonModule,
    DatedValueModule,
  ],
  exports: [ModuleSVGComponent],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SvgModuleModule { }
