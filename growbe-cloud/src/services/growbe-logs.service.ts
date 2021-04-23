import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {GrowbeLogs} from '../models/growbe-logs.model';
import {GrowbeLogsRepository} from '../repositories/growbe-logs.repository';
import {getTopic, MQTTService} from './mqtt.service';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeLogsService {
  constructor(
    @repository(GrowbeLogsRepository)
    private logsRepository: GrowbeLogsRepository,
    @service(MQTTService) public mqttService: MQTTService,
  ) {}

  async addLog(log: Partial<GrowbeLogs>) {
    log.timestamp = new Date();
    const logEntity = await this.logsRepository.create(log);
    await this.mqttService.send(
      getTopic(logEntity.growbeMainboardId, '/cloud/logs'),
      JSON.stringify(log),
    );
    return logEntity;
  }
}
