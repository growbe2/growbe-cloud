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
	  if (channel === 'dev') {
		  return this.versionRepository.findOne({where: {version: 'latest'}}).then(x => x as GrowbeMainboardVersion)
	  }
	  return this.versionRepository.find({order: ['release DESC'], limit: 1}).then(
		  x => x[0]
	  );
  }

  async releaseNewVersion(name: string): Promise<GrowbeMainboardVersion> {
    let version: GrowbeMainboardVersion | null;

    if (name == 'latest') {
      version = await this.versionRepository.findOne({where: { version: name }})

      if (!version) {
        version = await this.versionRepository.create(new GrowbeMainboardVersion({version: name, release: new Date()}))
      } else {
        version.release = new Date();
        await this.versionRepository.update(version);
      }

    } else {
  	  version = new GrowbeMainboardVersion();
      version.version = name;
      version.release = new Date();

      await this.versionRepository.save(version);
    }

    const data = VersionRelease.encode(VersionRelease.create({
      version: version.version,
      channel: (version.version === 'latest') ? 'dev': 'prod',
    })).finish();

    await this.mqttService.send("/update", data);

    return version;
  }
}
