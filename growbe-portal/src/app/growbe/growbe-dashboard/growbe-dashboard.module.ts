import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowbeDynamicDashboardComponent } from './growbe-dynamic-dashboard/growbe-dynamic-dashboard.component';

import {
    ProjectDashboardModule,
    LayoutDirectiveModule,
} from '@berlingoqc/fuse-extra';
import { GrowbeDashboardRoutingModule } from './growbe-dashboard.routing';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { GraphModule } from '../module/graph/graph.module';
import { FuseSharedModule, FuseWidgetModule } from '@berlingoqc/fuse';
import { GrowbeDashboardFormComponent } from './growbe-dashboard-form/growbe-dashboard-form.component';
import { GrowbeDashboardHomeComponent } from './growbe-dashboard-home/growbe-dashboard-home.component';

import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { GrowbeMainboardModule } from '../growbe-mainboard/growbe-mainboard.module';
import {
    DashboardModule, DashboardRegistryService,
} from '@growbe2/growbe-dashboard';
import { GrowbeDashboardRegistry } from 'src/app/growbe/growbe-dashboard/items';
import { HardwareAlarmModule } from '../module/hardware-alarm/hardware-alarm.module';

@NgModule({
    declarations: [
        GrowbeDynamicDashboardComponent,
        GrowbeDashboardFormComponent,
        GrowbeDashboardHomeComponent,
    ],
    imports: [
        CommonModule,

        DashboardModule,

        ProjectDashboardModule,
        LayoutDirectiveModule,

        GraphModule,
        GrowbeMainboardModule,
        HardwareAlarmModule,

        FuseWidgetModule,
        FuseSharedModule,

        AutoFormModule,

        MatTabsModule,
        MatIconModule,
        MatButtonModule,
        GrowbeDashboardRoutingModule,
    ],
    providers: [

    ]
})
export class GrowbeDashboardModule {
    constructor() {}
}
