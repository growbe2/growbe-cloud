import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeTableComponent } from './component/growbe-table/growbe-table.component';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { GrowbeStatusDotComponent } from './component/growbe-status-dot/growbe-status-dot.component';
import { GrowbeStateComponent } from './component/growbe-state/growbe-state.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ConfirmationModule } from '@berlingoqc/ngx-common';
import { MatIconModule } from '@angular/material/icon';
import { GrowbeLocalConnectionComponent } from './component/growbe-local-connection/growbe-local-connection.component';
import { DatedValueModule } from 'src/app/shared/dated-value/dated-value.module';

@NgModule({
    declarations: [
        GrowbeTableComponent,
        GrowbeStatusDotComponent,
        GrowbeStateComponent,
        GrowbeLocalConnectionComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      AutoTableModule,
      MatButtonModule,
      ConfirmationModule,
      MatIconModule,
      DatedValueModule,
    ],
    exports: [
      GrowbeTableComponent,
      GrowbeStateComponent,
      GrowbeLocalConnectionComponent,
    ],
})
export class GrowbeMainboardModule {}
