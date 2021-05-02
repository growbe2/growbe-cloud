import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrowbeManagerDashboardComponent } from './growbe-manager-dashboard/growbe-manager-dashboard.component';
import { GrowbeManagerDetailComponent } from './growbe-manager-detail/growbe-manager-detail.component';
import { GrowbeMainboardAPI } from '../api/growbe-mainboard';
import { GrowbeModuleDetailComponent } from '../module/component/growbe-module-detail/growbe-module-detail.component';
import { GrowbeModuleAPI } from '../api/growbe-module';
import { GrowbeModuleDashboardComponent } from '../module/growbe-module-dashboard/growbe-module-dashboard.component';

const routes: Routes = [
    { path: '', component: GrowbeManagerDashboardComponent },
    {
        path: ':id',
        component: GrowbeManagerDetailComponent,
        data: {
            include: [
                {
                    relation: 'growbeModules',
                },
                {
                    relation: 'growbeWarnings',
                },
                {
                    relation: 'growbeMainboardConfig',
                },
            ],
        },
        resolve: {
            mainboard: GrowbeMainboardAPI,
        },
    },
    {
        path: ':mainboardId/module/:id',
        component: GrowbeModuleDashboardComponent,
        data: {
            include: [],
        },
        resolve: {
            module: GrowbeModuleAPI,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GrowbeManagerRoutingModule {}
