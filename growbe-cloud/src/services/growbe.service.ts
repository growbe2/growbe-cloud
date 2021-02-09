import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { FilterExcludingWhere, repository } from '@loopback/repository';
import { GrowbeMainboard, GrowbeMainboardWithRelations } from '../models';
import { GrowbeMainboardRepository } from '../repositories';


export type GrowbeRegisterState = 'BEATH_UNREGISTER' | 'UNREGISTER' | 'REGISTER';

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

  async register(id: string, userId: string) {
    const mainboard = await this.findOrCreate(id);
    console.log(mainboard);
    if(mainboard.new) {

    } else if(!mainboard.userId) {

    }
    return 
  }


  private createMainboard(id: string, name?: string) {
    return this.mainboardRepository.create({id,name,lastUpdateAt: new Date()});
  }
}
