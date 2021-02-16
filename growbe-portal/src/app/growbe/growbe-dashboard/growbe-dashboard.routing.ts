import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrowbeDynamicDashboardComponent } from "./growbe-dynamic-dashboard/growbe-dynamic-dashboard.component";
import { GrowbeDashboardResolver } from '../resolvers/dashboard';
import { GrowbeDashboardFormComponent } from "./growbe-dashboard-form/growbe-dashboard-form.component";
import { GrowbeDashboardHomeComponent } from "./growbe-dashboard-home/growbe-dashboard-home.component";
import { GrowbeDashboardItemFormComponent } from "./growbe-dashboard-item-form/growbe-dashboard-item-form.component";

const routes: Routes = [
  {
    path: '', component: GrowbeDashboardHomeComponent,
    resolve: {
      dashboard: GrowbeDashboardResolver,
    }
  },
  {
    path: 'new', component: GrowbeDashboardFormComponent,
    data: {
      mode: 'new'
    }
  },
  {
    path: ':id', component: GrowbeDynamicDashboardComponent,
    data: {
      include: [{relation: 'growbeDashboardItems'}]
    },
    resolve: {
      dashboard: GrowbeDashboardResolver,
    }
  },
  {
    path: ':id/edit', component: GrowbeDashboardFormComponent,
    data: {
      mode: 'edit'
    },
    resolve: {
      dashboard: GrowbeDashboardResolver,
    }
  },
  {
    path: ':id/item/:item', component: GrowbeDashboardItemFormComponent,
    data: {
      mode: 'edit'
    }
   },
  {
    path: ':id/item/new', component: GrowbeDashboardItemFormComponent,
    data: {
      mode: 'new'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowbeDashboardRoutingModule {}
