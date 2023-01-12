import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalibrationProcessComponent } from './calibration-process.component';
import { GrowbeCalibrationRoutingModule } from './calibration-process.routing';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { LoadingButtonModule, MatTabsExtraModule } from '@berlingoqc/ngx-common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutDirectiveModule, Login2Module, LoginModule, ProjectDashboardModule } from '@berlingoqc/fuse-extra';
import { FuseWidgetModule } from '@berlingoqc/fuse';
import { LoopbackRestPipeModule } from '@berlingoqc/ngx-loopback';
import { MatStepperModule } from '@angular/material/stepper';
import { SvgModuleModule } from '../../svg/svg-module.module';



@NgModule({
  declarations: [
    CalibrationProcessComponent
  ],
  imports: [
    CommonModule,

    AutoFormModule,

    LoadingButtonModule,
    MatStepperModule,
    MatTabsModule,
    MatTabsExtraModule,
    MatButtonModule,
    MatIconModule,
    ProjectDashboardModule,
    LayoutDirectiveModule,

    LoginModule,

    FuseWidgetModule,

    LoopbackRestPipeModule,

    SvgModuleModule,

    GrowbeCalibrationRoutingModule,
  ]
})
export class CalibrationProcessModule { }
