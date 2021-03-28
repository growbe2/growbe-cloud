import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeTableComponent } from './component/growbe-table/growbe-table.component';
import { GrowbeDetailComponent } from './component/growbe-detail/growbe-detail.component';
import { GrowbeRegisterComponent } from './component/growbe-register/growbe-register.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { GrowbeStatusDotComponent } from './component/growbe-status-dot/growbe-status-dot.component';
import { GrowbeStateComponent } from './component/growbe-state/growbe-state.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [GrowbeTableComponent, GrowbeDetailComponent, GrowbeRegisterComponent, GrowbeStatusDotComponent, GrowbeStateComponent],
  imports: [
    CommonModule,
    RouterModule,
    AutoTableModule,
    MatButtonModule,
  ],
  exports: [GrowbeTableComponent, GrowbeDetailComponent, GrowbeRegisterComponent, GrowbeStateComponent]
})
export class GrowbeMainboardModule {}
