import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { FilterExcludingWhere, model, repository } from '@loopback/repository';
import { GrowbeMainboard, GrowbeMainboardWithRelations } from '../models';
import { GrowbeMainboardRepository } from '../repositories';


export type GrowbeRegisterState = 'BEATH_UNREGISTER' | 'UNBEATH_REGISTER' | 'UNREGISTER' | 'REGISTER' | 'ALREADY_REGISTER';

@model()
export class GrowbeRegisterResponse {
  state: GrowbeRegisterState;
}

@model()
export class GrowbeRegisterRequest {
  id: string;
}

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeService {
  constructor(
    @repository(GrowbeMainboardRepository)
    public mainboardRepository: GrowbeMainboardRepository
  ) {}

  async findOrCreate(id: string, filter: FilterExcludingWhere<GrowbeMainboard> = {}): Promise<GrowbeMainboard & {new?: boolean}> {
    let mainboard: any = await this.mainboardRepository.findOne(Object.assign(filter, {where: {id}}));
    if(!mainboard) {
      mainboard = await this.createMainboard(id);
      mainboard.new = true;
    }
    return mainboard;
  }

  async register(userId: string, request: GrowbeRegisterRequest) {
    const mainboard = await this.findOrCreate(request.id);
    const response = new GrowbeRegisterResponse();
    if(mainboard.new) {
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
