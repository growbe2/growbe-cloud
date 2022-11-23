import { BindingScope, injectable } from "@loopback/context";
import { service } from "@loopback/core";
import { repository } from "@loopback/repository";
import { GrowbeMainboardVersion } from "../models";
import { GrowbeMainboardVersionRepository } from "../repositories";
import { MQTTService } from "./mqtt.service";

import { VersionRelease } from '@growbe2/growbe-pb';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeMainboardVersionService {
  constructor(
    @repository(GrowbeMainboardVersionRepository)
	  private versionRepository: GrowbeMainboardVersionRepository,
	  @service(MQTTService)
	  public mqttService: MQTTService,
  ) {}

  async foundLatest(channel?: string): Promise<GrowbeMainboardVersion> {
      let regex: any = {}
	  if (channel === 'dev') {
        regex['like'] = '%-%';
	  } else {
        regex['nlike'] = "%-%";
      }
	  return this.versionRepository.find({ where: { version: regex }, order: ['release DESC'], limit: 1}).then(
		  x => {
            return x[0];
          }
	  );
  }

  async releaseNewVersion(name: string): Promise<GrowbeMainboardVersion> {

  	let version = new GrowbeMainboardVersion();
    version.version = name;
    version.release = new Date();

    await this.versionRepository.save(version);

    const data = VersionRelease.encode(VersionRelease.create({
      version: version.version,
      channel: (version.version.includes('-')) ? 'dev': 'prod',
    })).finish();

    await this.mqttService.send("/update", data);

    return version;
  }
}
