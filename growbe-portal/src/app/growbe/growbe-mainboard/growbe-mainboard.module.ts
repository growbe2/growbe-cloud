import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeTableComponent } from './component/growbe-table/growbe-table.component';
import { GrowbeDetailComponent } from './component/growbe-detail/growbe-detail.component';
import { GrowbeRegisterComponent } from './component/growbe-register/growbe-register.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { GrowbeStatusDotComponent } from './component/growbe-status-dot/growbe-status-dot.component';
import { GrowbeEventService } from '../services/growbe-event.service';


@NgModule({
  declarations: [GrowbeTableComponent, GrowbeDetailComponent, GrowbeRegisterComponent, GrowbeStatusDotComponent],
  imports: [
    CommonModule,
    AutoTableModule,

  ],
  exports: [GrowbeTableComponent, GrowbeDetailComponent, GrowbeRegisterComponent]
})
export class GrowbeMainboardModule {}
