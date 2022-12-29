import { RTCTime } from "@growbe2/growbe-pb";
import { BindingScope, injectable } from "@loopback/context";
import { service } from "@loopback/core";
import { GrowbeActionService } from ".";
import { GrowbeModuleService } from "./growbe-module.service";

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeSyncService {

  constructor(
	  @service(GrowbeActionService)
	  private growbeService: GrowbeActionService,
	  @service(GrowbeModuleService)
	  private growbeModuleService: GrowbeModuleService,
  ) {}


  public async syncConfig(growbeId: string) {
	  const data = new Date();

	  await this.growbeModuleService.syncModulesConfig(growbeId);
  }

}
