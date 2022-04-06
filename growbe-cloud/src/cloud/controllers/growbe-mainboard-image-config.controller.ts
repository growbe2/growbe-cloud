import {inject, service} from "@loopback/core";
import {param, post, requestBody} from "@loopback/rest";
import {SecurityBindings, UserProfile} from "@loopback/security";
import {GrowbeMainboardImageConfig} from "../../models";
import {GrowbeImangeConfigService} from "../../services";
import {authorizeGrowbe} from "../authorization";



export class GrowbeMainboardImageController {
  constructor(
    @service(GrowbeImangeConfigService)
    private imageConfigService: GrowbeImangeConfigService,
  ) {}


  @post('/growbe/{id}/image/configuration')
  @authorizeGrowbe({
    growbeIdIndex: 0,
  })
  async generateConfigArchive(
    @param.path.string('id') growbeId: string,
    @requestBody() body: GrowbeMainboardImageConfig,
  ) {
    const configFiles = await this.imageConfigService.generateConfigFiles(growbeId, body);
    const archive =  this.imageConfigService.generateArchiveFromConfigFiles(growbeId, configFiles);
    return {
        archive
    };
  }
}
