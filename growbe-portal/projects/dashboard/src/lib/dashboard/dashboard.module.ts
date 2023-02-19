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
import {
    LayoutDirectiveModule,
    ProjectDashboardModule,
} from '@berlingoqc/fuse-extra';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
    DashboardRegistryService,
} from './registry/dashboard-registry.service';
import { DashboardProjectComponent } from './components/dashboard-project/dashboard-project.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AutoFormModule } from '@berlingoqc/ngx-autoform';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardService } from './dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatTabsExtraModule, TemplateContentModule } from '@berlingoqc/ngx-common';
import { AddToDashboardDirective } from './add-dashboard.directive';
import { DashboardFullComponent } from './components/dashboard-full/dashboard-full.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardOneComponent } from './components/dashboard-one/dashboard-one.component';
import { ErrorComponent } from './components/error/error.component';
import {RegisteryStoreModule} from './registery-store/registery-store.module';

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
        ProjectDashboardModule,
        LayoutDirectiveModule,

        TemplateContentModule,

        AutoFormModule,

        MatCardModule,
        MatGridListModule,
        MatMenuModule,
        MatTabsModule,
        MatTabsExtraModule,
        MatIconModule,
        MatButtonModule,


        RegisteryStoreModule,
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
