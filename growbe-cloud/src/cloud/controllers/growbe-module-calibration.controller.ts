import { SOILCalibrationStart, SOILCalibrationStep } from "@growbe2/growbe-pb";
import { service } from "@loopback/core";
import { param, patch, requestBody } from "@loopback/rest";
import { GrowbeCalibrationService } from "../../services/growbe-calibration.service";
import { authorizeGrowbe } from "../authorization";



export class GrowbeModuleCalibrationController {
  constructor(
    @service(GrowbeCalibrationService)
    private calibrationService: GrowbeCalibrationService,
  ) {}


  @patch("/growbe/{id}/modules/{moduleid}/calibration/start")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  startCalibration(
      @param.path.string("id") id: string,
      @param.path.string("moduleid") moduleId: string,
      @param.query.boolean("direct") direct: boolean,
      @requestBody() body: SOILCalibrationStart,
  ) {
      return this.calibrationService.startCalibration(id, moduleId, body, direct);
  }

  @patch("/growbe/{id}/modules/{moduleid}/calibration/set")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  setCalibration(
      @param.path.string("id") id: string,
      @param.path.string("moduleid") moduleId: string,
      @param.query.boolean("direct") direct: boolean,
      @requestBody() body: SOILCalibrationStep,
  ) {
      return this.calibrationService.setStepCalibration(id, moduleId, body, direct);
  }

  @patch("/growbe/{id}/modules/{moduleid}/calibration/confirm")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  confirmCalibration(
      @param.path.string("id") id: string,
      @param.path.string("moduleid") moduleId: string,
      @param.query.boolean("direct") direct: boolean,
  ) {
      return this.calibrationService.confirmCalibration(id, moduleId, direct);
  }

  @patch("/growbe/{id}/modules/{moduleid}/calibration/cancel")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  cancelCalibration(
      @param.path.string("id") id: string,
      @param.query.boolean("direct") direct: boolean,
      @param.path.string("moduleid") moduleId: string,
  ) {
      return this.calibrationService.cancelCalibration(id, moduleId, direct);
  }

  @patch("/growbe/{id}/modules/{moduleid}/calibration/status")
  @authorizeGrowbe({
    growbeIdIndex: 0
  })
  statusCalibration(
      @param.path.string("id") id: string,
      @param.path.string("moduleid") moduleId: string,
      @param.query.boolean("direct") direct: boolean,
      @requestBody() body: SOILCalibrationStep,
  ) {
      return this.calibrationService.statusCalibration(id, moduleId, direct);
  }

}
