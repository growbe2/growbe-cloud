import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrowbeManagerDashboardComponent } from "./growbe-manager-dashboard/growbe-manager-dashboard.component";
import { GrowbeManagerDetailComponent } from "./growbe-manager-detail/growbe-manager-detail.component";
import { GrowbeMainboardResolver } from '../resolvers/mainboard';
import { GrowbeMainboardAPI } from "../api/growbe-mainboard";

const routes: Routes = [
  { path: '', component: GrowbeManagerDashboardComponent },
  { path: ':id', component: GrowbeManagerDetailComponent, data: {
    include: [
      {
        relation: 'growbeModules',
      },
      {
        relation: 'growbeWarnings',
      },
      {
        relation: 'growbeMainboardConfig',
      }
    ]
  }, resolve: {
    mainboard: GrowbeMainboardAPI,
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowbeManagerRoutingModule {}
