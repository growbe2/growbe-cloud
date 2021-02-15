import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { model, property, repository } from '@loopback/repository';
import { GrowbeSensorValue } from '../models';
import { GrowbeSensorValueRepository } from '../repositories';



@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeModuleValueService {
  constructor(
    @repository(GrowbeSensorValueRepository)
    public sensorValueRepository: GrowbeSensorValueRepository,
  ) {}


  async onModuleData(boardId: string, moduleType: string, data: any) {
    let value = new GrowbeSensorValue(Object.assign(data, {
      moduleType,
      moduleId: data.id,
      growbeMainboardId: boardId,
      createdAt: new Date(),
    }));
    delete value.id;
    value = await this.sensorValueRepository.create(value);
    return value;
  }
}
