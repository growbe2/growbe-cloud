import { RTCTime } from "@growbe2/growbe-pb";
import { BindingScope, injectable } from "@loopback/context";
import { service } from "@loopback/core";
import { GrowbeModuleService } from "./growbe-module.service";
import { GrowbeService } from "./growbe.service";

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeSyncService {

  constructor(
	  @service(GrowbeService)
	  private growbeService: GrowbeService,
	  @service(GrowbeModuleService)
	  private growbeModuleService: GrowbeModuleService,
  ) {}


  public async syncConfig(growbeId: string) {
	  const data = new Date();
	  await this.growbeService.setRTC(growbeId, new RTCTime({
		  year: data.getFullYear(),
		  month: data.getMinutes() + 1,
		  day: data.getDate(),
		  hour: data.getHours(),
		  minute: data.getMinutes(),
		  second: data.getSeconds()
	  }));
	  await this.growbeModuleService.syncModulesConfig(growbeId);
  }

}