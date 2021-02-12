import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GrowbeManagerDashboardComponent } from "./growbe-manager-dashboard/growbe-manager-dashboard.component";

const routes: Routes = [
  { path: '', component: GrowbeManagerDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrowbeManagerRoutingModule {}
