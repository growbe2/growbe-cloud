import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeTableComponent } from './component/growbe-table/growbe-table.component';
import { GrowbeDetailComponent } from './component/growbe-detail/growbe-detail.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { GrowbeStatusDotComponent } from './component/growbe-status-dot/growbe-status-dot.component';
import { GrowbeStateComponent } from './component/growbe-state/growbe-state.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ConfirmationModule } from '@berlingoqc/ngx-common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        GrowbeTableComponent,
        GrowbeDetailComponent,
        GrowbeStatusDotComponent,
        GrowbeStateComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      AutoTableModule,
      MatButtonModule,
      ConfirmationModule,
      MatIconModule
    ],
    exports: [
      GrowbeTableComponent,
      GrowbeDetailComponent,
      GrowbeStateComponent,
    ],
})
export class GrowbeMainboardModule {}
