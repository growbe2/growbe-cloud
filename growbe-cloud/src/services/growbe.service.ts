import {injectable, inject, BindingScope, service} from '@loopback/core';
import { FilterExcludingWhere, model, property, repository } from '@loopback/repository';
import { GrowbeMainboard, GrowbeMainboardWithRelations } from '../models';
import { GrowbeMainboardRepository } from '../repositories';

import { RTCTime } from '@growbe2/growbe-pb';
import { getTopic, MQTTService } from './mqtt.service';
import { GrowbeMainboardConfig } from '../models/growbe-mainboard-config.model';
import { GrowbeMainboardConfigRepository } from '../repositories/growbe-mainboard-config.repository';
import { GrowbeMainboardBindings } from '../keys';

import pb from '@growbe2/growbe-pb';
import { GrowbeLogsService } from './growbe-logs.service';
import { GroupEnum, GrowbeLogs, LogTypeEnum, SeverityEnum } from '../models/growbe-logs.model';

export type GrowbeRegisterState = 'BEATH_UNREGISTER' | 'UNBEATH_REGISTER' | 'UNREGISTER' | 'REGISTER' | 'ALREADY_REGISTER';

@model()
export class GrowbeRegisterResponse {
  @property()
  state: GrowbeRegisterState;
  @property()
  growbe: GrowbeMainboard;
}

@model()
export class GrowbeRegisterRequest {
  @property()
  id: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeService {
  constructor(
    @repository(GrowbeMainboardRepository)
    public mainboardRepository: GrowbeMainboardRepository,
    @repository(GrowbeMainboardConfigRepository)
    public mainboardConfigRepository: GrowbeMainboardConfigRepository,
    @service(MQTTService)
    private mqttService: MQTTService,
    @inject(GrowbeMainboardBindings.DEFAULT_CONFIG)
    private defaultConfig: Partial<GrowbeMainboardConfig>,
    @service(GrowbeLogsService)
    private logsService: GrowbeLogsService,
  ) {}

  async findOrCreate(id: string, filter: FilterExcludingWhere<GrowbeMainboard> = {}): Promise<GrowbeMainboard & {new?: boolean}> {
    let mainboard: any = await this.mainboardRepository.findOne(Object.assign(filter, {where: {id}}));
    if(!mainboard) {
      mainboard = await this.createMainboard(id);
      mainboard.new = true;
    }
    return mainboard;
  }

  async updateConfig(growbeId: string, config: pb.GrowbeMainboardConfig) {
      await this.mqttService.send(getTopic(growbeId, "/board/config"), pb.GrowbeMainboardConfig.encode(config).finish())
      this.mainboardRepository.growbeMainboardConfig(growbeId).patch({config})
  }

  async setRTC(growbeId: string, rtcTime: RTCTime) {
    return this.mqttService.send(getTopic(growbeId, "/board/setTime"), pb.RTCTime.encode(rtcTime).finish()).then((value) => {
      return this.logsService.addLog({
        group: GroupEnum.MAINBOARD,
        type: LogTypeEnum.RTC_UPDATE,
        severity: SeverityEnum.LOW,
        growbeMainboardId: growbeId,
        message: `rtc set : ${rtcTime.toJSON()}`
      })
    })
  }

  async register(userId: string, request: GrowbeRegisterRequest) {
    const response = new GrowbeRegisterResponse();
    const mainboard = await this.findOrCreate(request.id);
    if(mainboard.new == true) {
      response.state = 'UNBEATH_REGISTER';
      await this.mainboardRepository.updateById(request.id, {userId})
    } else if(!mainboard.userId) {
      response.state = 'REGISTER';
      await this.mainboardRepository.updateById(request.id, {userId})
    } else {
      response.state = 'ALREADY_REGISTER';
    }
    response.growbe = mainboard;
    return response;
  }

  async getGrowbeByProfile(userId: string, filter: FilterExcludingWhere<GrowbeMainboard> = {}) {
    return this.mainboardRepository.find(Object.assign(filter, {where: {userId}}))
  }

  /**
   * CreateMainboard
   *  * crée une mainboard
   *  * crée une config par default
   * @param id 
   * @param name 
   */
  private async createMainboard(id: string, name?: string) {
    const mainboard = await this.mainboardRepository.create({id,name});
    mainboard.growbeMainboardConfig = await this.mainboardConfigRepository.create({config: this.defaultConfig, growbeMainboardId: mainboard.id});

    return mainboard;
  }
}
