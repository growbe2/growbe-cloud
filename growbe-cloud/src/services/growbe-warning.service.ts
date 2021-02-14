import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { GrowbeWarning } from '../models';
import { GrowbeWarningRepository } from '../repositories';
import { GrowbeMainboardConfigRepository } from '../repositories/growbe-mainboard-config.repository';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeWarningService {
  constructor(
    @repository(GrowbeWarningRepository)
    public warningRepository: GrowbeWarningRepository,
  ) {}


  async addWarning(warn: Partial<GrowbeWarning>) {
    // Regarde si le warning existe et si on peut
    // en crée un autre
    const warning = await this.warningRepository.findOne({where: {
      growbeMainboardId: warn.growbeMainboardId,
      warningKeyId: warn.warningKeyId,
    }, include: ['warningKey']});

    if(warning) {
      if(!warning.warningKey) {
        // TODO : erreur ou dequoi
        return warning;
      }
      if(!warning.warningKey.multi) {
        return warning;
      }
    }
    return this.warningRepository.create(Object.assign(warn, {createdAt: new Date()}));
  }
}
