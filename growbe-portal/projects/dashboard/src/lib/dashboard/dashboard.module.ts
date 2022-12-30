import {
    Inject,
    ModuleWithProviders,
    NgModule,
    Optional,
    Type,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DashboardItemComponent,
    DashboardItemRegistryCopyDirective,
    ItemContentDirective,
} from './components/dashboard-item/dashboard-item.component';
import { DashboardPanelComponent } from './components/dashboard-panel/dashboard-panel.component';
/*
import {
    LayoutDirectiveModule,
    ProjectDashboardModule,
} from '@berlingoqc/fuse-extra';
*/
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import {
    DashboardRegistryService,
} from './registry/dashboard-registry.service';
import { DashboardProjectComponent } from './components/dashboard-project/dashboard-project.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { DashboardService } from './dashboard.service';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatTabsExtraModule, TemplateContentModule } from '@berlingoqc/ngx-common';
import { AddToDashboardDirective } from './add-dashboard.directive';
import { DashboardFullComponent } from './components/dashboard-full/dashboard-full.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardOneComponent } from './components/dashboard-one/dashboard-one.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
    declarations: [
        DashboardItemComponent,
        DashboardPanelComponent,
        DashboardProjectComponent,
        DashboardOneComponent,
        ItemContentDirective,
        DashboardItemRegistryCopyDirective,
        AddToDashboardDirective,
        DashboardFullComponent,
        DashboardComponent,
        ErrorComponent,
    ],
    imports: [
        CommonModule,
        //ProjectDashboardModule,
        //LayoutDirectiveModule,

        TemplateContentModule,

        AutoFormModule,

        MatCardModule,
        MatGridListModule,
        MatMenuModule,
        MatTabsModule,
        MatTabsExtraModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        DashboardPanelComponent,
        DashboardComponent,
        DashboardItemComponent,
        AddToDashboardDirective,
    ],
})
export class DashboardModule {
    static forRoot(
        service: Type<DashboardService>,
    ): ModuleWithProviders<DashboardModule> {
        return {
            ngModule: DashboardModule,
            providers: [
                DashboardRegistryService,
                {
                    provide: DashboardService,
                    useClass: service,
                },
            ],
        };
    }
}
