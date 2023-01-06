import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeModuleDashboardComponent } from './growbe-module-dashboard.component';
import { DashboardModule, DashboardRegistryService } from '@growbe2/growbe-dashboard';
import { GraphModule } from '../graph/graph.module';
import { UnitModule } from 'src/app/shared/unit/unit.module';
import { GrowbeModuleModule } from '../growbe-module.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { TableLayoutModule } from 'src/app/shared/table-layout/table-layout.module';
import { SvgModuleModule } from '../svg/svg-module.module';
import { TerminalModule } from 'src/app/shared/terminal/terminal.module';
import { GrowbeDashboardRegistry } from 'src/app/growbe/growbe-dashboard/items';
import { RelayModule } from '../relay/relay.module';

@NgModule({
    declarations: [GrowbeModuleDashboardComponent],
    imports: [
        CommonModule,


        SvgModuleModule,

        TerminalModule,

        RelayModule,

        MatChipsModule,
        MatToolbarModule,
        DashboardModule,
        GraphModule,
        UnitModule,
        GrowbeModuleModule,
        TableLayoutModule,
    ],
    providers: [
        {
          provide: DashboardRegistryService,
          useClass: GrowbeDashboardRegistry,
        }
    ]
})
export class GrowbeModuleDashboardModule {}
