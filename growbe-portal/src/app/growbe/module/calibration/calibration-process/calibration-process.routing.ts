import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MqttConnectGuard } from "src/app/growbe/guard/mqtt-connect.guard";
import { CalibrationProcessComponent } from "./calibration-process.component";
import { CalibrationProcessGuard } from "./calibration-process.guard";

const routes: Routes = [
    { path: ':growbeId/:moduleId', component: CalibrationProcessComponent, canDeactivate: [CalibrationProcessGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        CalibrationProcessGuard,
    ]
})
export class GrowbeCalibrationRoutingModule {}
