import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import { repository } from '@loopback/repository';
import { GrowbeWarning } from '../models';
import { GroupEnum, GrowbeLogs, LogTypeEnum, SeverityEnum } from '../models/growbe-logs.model';
import { GrowbeWarningRepository } from '../repositories';
import { GrowbeMainboardConfigRepository } from '../repositories/growbe-mainboard-config.repository';
import { GrowbeLogsService } from './growbe-logs.service';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeWarningService {
  constructor(
    @repository(GrowbeWarningRepository)
    public warningRepository: GrowbeWarningRepository,
    @service(GrowbeLogsService)
    public logsService: GrowbeLogsService,
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
    const warningEntity = await this.warningRepository.create(Object.assign(warn, {createdAt: new Date()}));

    await this.logsService.addLog({
      growbeMainboardId: warningEntity.growbeMainboardId,
      group: GroupEnum.MAINBOARD,
      type: LogTypeEnum.WARNING_CREATED,
      message: warningEntity.text,
      severity: SeverityEnum.MEDIUM,
    })

    return warningEntity;
  }
}
