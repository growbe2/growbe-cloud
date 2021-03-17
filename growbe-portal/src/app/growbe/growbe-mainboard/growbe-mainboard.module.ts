import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeTableComponent } from './component/growbe-table/growbe-table.component';
import { GrowbeDetailComponent } from './component/growbe-detail/growbe-detail.component';
import { GrowbeRegisterComponent } from './component/growbe-register/growbe-register.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { GrowbeStatusDotComponent } from './component/growbe-status-dot/growbe-status-dot.component';
import { GrowbeEventService } from '../services/growbe-event.service';
import { GrowbeClockStateComponent } from './component/growbe-clock-state/growbe-clock-state.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LayoutDirectiveModule, ProjectDashboardModule } from '@berlingoqc/fuse-extra';
import { FuseWidgetModule } from '@berlingoqc/fuse';


@NgModule({
  declarations: [GrowbeTableComponent, GrowbeDetailComponent, GrowbeRegisterComponent, GrowbeStatusDotComponent, GrowbeClockStateComponent],
  imports: [
    CommonModule,
    RouterModule,
    AutoTableModule,
    MatButtonModule,

  ],
  exports: [GrowbeTableComponent, GrowbeDetailComponent, GrowbeRegisterComponent, GrowbeClockStateComponent]
})
export class GrowbeMainboardModule {}
