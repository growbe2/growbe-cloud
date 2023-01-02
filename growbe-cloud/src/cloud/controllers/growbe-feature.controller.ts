import {service} from "@loopback/core";
import {get} from "@loopback/rest";
import {GrowbeFeatureService} from "../../services";

export class GrowbeFeatureController {
  constructor(
    @service(GrowbeFeatureService)
    private service: GrowbeFeatureService,
  ) {}

  @get('/features')
  getHardwareAlarmEvent(
  ) {
    return this.service.getFeatures();
  }

}


