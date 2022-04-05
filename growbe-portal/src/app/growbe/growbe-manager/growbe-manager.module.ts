import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeManagerDashboardComponent } from './growbe-manager-dashboard/growbe-manager-dashboard.component';
import { GrowbeMainboardModule } from '../growbe-mainboard/growbe-mainboard.module';
import { GrowbeManagerRoutingModule } from './growbe-manager.routing';

import {
    LayoutDirectiveModule,
    PageLayoutModule,
    ProjectDashboardModule,
} from '@berlingoqc/fuse-extra';
import { GraphModule } from '../module/graph/graph.module';
import { GrowbeManagerDetailComponent } from './growbe-manager-detail/growbe-manager-detail.component';
import { FuseWidgetModule } from '@berlingoqc/fuse';
import { MatTabsModule } from '@angular/material/tabs';
import { GrowbeModuleModule } from '../module/growbe-module.module';
import { AutoTableModule } from '@berlingoqc/ngx-autotable';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { LoopbackRestPipeModule } from '@berlingoqc/ngx-loopback';
import { TerminalModule } from 'src/app/shared/terminal/terminal.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonPipeModule, MatTabsExtraModule } from '@berlingoqc/ngx-common';
import { VideoStreamModule } from '../video-stream/video-stream.module';
import { GrowbeModuleDashboardModule } from '../module/growbe-module-dashboard/growbe-module-dashboard.module';
import { GrowbeWarningModule } from '../growbe-warning/growbe-warning.module';
import { MatDialogModule } from '@angular/material/dialog';
import { VirtualRelayModule } from '../module/virtual-relay/virtual-relay.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
    declarations: [
        GrowbeManagerDashboardComponent,
        GrowbeManagerDetailComponent,
    ],
    imports: [
        CommonModule,

        CommonPipeModule,

        PageLayoutModule,


        AutoTableModule,
        AutoFormModule,

        MatExpansionModule,
        MatDialogModule,
        MatTooltipModule,

        FlexLayoutModule,

        GrowbeManagerRoutingModule,
        VideoStreamModule,

        GrowbeModuleDashboardModule,

        VirtualRelayModule,

        GrowbeModuleModule,
        GrowbeMainboardModule,
        GrowbeWarningModule,
        GraphModule,

        MatTabsModule,
        MatTabsExtraModule,
        MatButtonModule,
        MatIconModule,

        MatToolbarModule,

        ProjectDashboardModule,
        LayoutDirectiveModule,

        FuseWidgetModule,

        LoopbackRestPipeModule,

        TerminalModule,
    ],
})
export class GrowbeManagerModule {}
