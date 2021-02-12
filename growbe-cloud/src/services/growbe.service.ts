import {injectable, /* inject, */ BindingScope, service} from '@loopback/core';
import { FilterExcludingWhere, model, property, repository } from '@loopback/repository';
import { GrowbeMainboard, GrowbeMainboardWithRelations } from '../models';
import { GrowbeMainboardRepository } from '../repositories';

import { RTCTime } from '@growbe2/growbe-pb';
import { getTopic, MQTTService } from './mqtt.service';

export type GrowbeRegisterState = 'BEATH_UNREGISTER' | 'UNBEATH_REGISTER' | 'UNREGISTER' | 'REGISTER' | 'ALREADY_REGISTER';

@model()
export class GrowbeRegisterResponse {
  @property()
  state: GrowbeRegisterState;
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
    @service(MQTTService)
    private mqttService: MQTTService,
  ) {}

  async findOrCreate(id: string, filter: FilterExcludingWhere<GrowbeMainboard> = {}): Promise<GrowbeMainboard & {new?: boolean}> {
    let mainboard: any = await this.mainboardRepository.findOne(Object.assign(filter, {where: {id}}));
    if(!mainboard) {
      mainboard = await this.createMainboard(id);
      mainboard.new = true;
    }
    return mainboard;
  }

  setTime(growbeId: string, date: RTCTime) {
      return this.mqttService.send(getTopic(growbeId, "setTime"), RTCTime.encode(date))
  }

  async register(userId: string, request: GrowbeRegisterRequest) {
    const mainboard = await this.findOrCreate(request.id);
    const response = new GrowbeRegisterResponse();
    if(mainboard.new == true) {
      response.state = 'UNBEATH_REGISTER';
      await this.mainboardRepository.updateById(request.id, {userId})
    } else if(!mainboard.userId) {
      response.state = 'REGISTER';
      await this.mainboardRepository.updateById(request.id, {userId})
    } else {
      response.state = 'ALREADY_REGISTER';
    }
    return response;
  }

  async getGrowbeByProfile(userId: string, filter: FilterExcludingWhere<GrowbeMainboard> = {}) {
    return this.mainboardRepository.find(Object.assign(filter, {where: {userId}}))
  }

  private createMainboard(id: string, name?: string) {
    return this.mainboardRepository.create({id,name,lastUpdateAt: new Date()});
  }
}
