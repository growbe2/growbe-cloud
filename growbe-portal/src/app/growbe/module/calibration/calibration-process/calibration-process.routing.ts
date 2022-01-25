import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CalibrationProcessComponent } from "./calibration-process.component";

const routes: Routes = [
    { path: ':growbeId/:moduleId', component: CalibrationProcessComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GrowbeCalibrationRoutingModule {}
