import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualRelayControlComponent } from './virtual-relay-control/virtual-relay-control.component';
import { VirtualRelayTableComponent } from './virtual-relay-table/virtual-relay-table.component';
import { VirtualRelayDashboardComponent } from './virtual-relay-dashboard/virtual-relay-dashboard.component';
import { DashboardModule, DashboardRegistryService } from '@growbe2/growbe-dashboard';
import { GrowbeDashboardRegistry } from '../../growbe-dashboard/items';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RelayModule } from '../relay/relay.module';
import { LoopbackRestPipeModule } from '@berlingoqc/ngx-loopback';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';



@NgModule({
  declarations: [
    VirtualRelayControlComponent,
    VirtualRelayTableComponent,
    VirtualRelayDashboardComponent
  ],
  imports: [
    CommonModule,

    MatToolbarModule,
    MatChipsModule,
    MatIconModule,

    RelayModule,

    AutoTableModule,
    LoopbackRestPipeModule,

    DashboardModule,
  ],
  exports: [
    VirtualRelayControlComponent,
    VirtualRelayTableComponent,
    VirtualRelayDashboardComponent,
  ],
  providers: [
      {
          provide: DashboardRegistryService,
          useClass: GrowbeDashboardRegistry,
      } 
  ]
})
export class VirtualRelayModule { }
