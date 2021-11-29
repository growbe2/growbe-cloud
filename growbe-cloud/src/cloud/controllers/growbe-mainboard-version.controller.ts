import { service } from "@loopback/core";
import { get, param } from "@loopback/rest";
import { GrowbeMainboardVersionService } from "../../services/growbe-mainboard-version.service";

export class GrowbeMainboardVersionController {
    constructor(
      @service(GrowbeMainboardVersionService)
      private versionService: GrowbeMainboardVersionService,
    ) {}
  
    @get('/growbe-mainboard/version')
    findVersion(
        @param.query.string('channel') channel: string,
    ) {
      return this.versionService.foundLatest(channel);
    }
}