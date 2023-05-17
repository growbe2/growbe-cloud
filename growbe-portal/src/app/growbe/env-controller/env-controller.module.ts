import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvControllerTableComponent } from './env-controller-table/env-controller-table.component';
import { EnvControllerDashboardComponent } from './env-controller-dashboard/env-controller-dashboard.component';
import { EnvControllerSummaryComponent } from './env-controller-summary/env-controller-summary.component';
import {AutoTableModule} from '@berlingoqc/ngx-autotable';
import {AutoFormModule} from '@berlingoqc/ngx-autoform';
import {DashboardModule} from '@growbe2/growbe-dashboard';



@NgModule({
  declarations: [
    EnvControllerTableComponent,
    EnvControllerDashboardComponent,
    EnvControllerSummaryComponent
  ],
  imports: [
    CommonModule,

    AutoTableModule,
    AutoFormModule,
    DashboardModule,
  ]
})
export class EnvControllerModule { }
