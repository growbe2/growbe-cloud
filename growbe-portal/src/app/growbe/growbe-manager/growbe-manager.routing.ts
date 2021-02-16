import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrowbeManagerDashboardComponent } from "./growbe-manager-dashboard/growbe-manager-dashboard.component";
import { GrowbeManagerDetailComponent } from "./growbe-manager-detail/growbe-manager-detail.component";
import { GrowbeMainboardResolver } from '../resolvers/mainboard';

const routes: Routes = [
  { path: '', component: GrowbeManagerDashboardComponent },
  { path: ':id', component: GrowbeManagerDetailComponent, data: {
    include: []
  }, resolve: {
    mainboard: GrowbeMainboardResolver,
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowbeManagerRoutingModule {}
