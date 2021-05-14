import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrowbeDynamicDashboardComponent } from './growbe-dynamic-dashboard/growbe-dynamic-dashboard.component';
import { GrowbeDashboardFormComponent } from './growbe-dashboard-form/growbe-dashboard-form.component';
import { GrowbeDashboardHomeComponent } from './growbe-dashboard-home/growbe-dashboard-home.component';
import { GrowbeDashboardAPI } from '../api/growbe-dashboard';

const routes: Routes = [
    {
        path: '',
        component: GrowbeDashboardHomeComponent,
        resolve: {
            dashboard: GrowbeDashboardAPI,
        },
    },
    {
        path: 'new',
        component: GrowbeDashboardFormComponent,
        data: {
            mode: 'new',
        },
    },
    {
        path: ':id',
        component: GrowbeDynamicDashboardComponent,
        data: {},
        resolve: {
            dashboard: GrowbeDashboardAPI,
        },
    },
    {
        path: ':id/edit',
        component: GrowbeDashboardFormComponent,
        data: {
            mode: 'edit',
        },
        resolve: {
            dashboard: GrowbeDashboardAPI,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GrowbeDashboardRoutingModule {}
