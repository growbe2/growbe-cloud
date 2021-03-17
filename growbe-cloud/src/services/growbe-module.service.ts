import * as pb from '@growbe2/growbe-pb';
import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {GrowbeModuleWithRelations, GrowbeSensorValue} from '../models';
import {
  GrowbeModuleDefRepository,
  GrowbeModuleRepository,
  GrowbeSensorValueRepository,
} from '../repositories';
import {getTopic, MQTTService} from './mqtt.service';

const mapType: any = {
  AAA: 'THLModuleData',
  AAS: 'SOILModuleData',
};

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeModuleService {
  static PREFIX_LENGTH = 3;
  static SUFFIX_LENGTH = 9;

  constructor(
    @repository(GrowbeModuleDefRepository)
    public moduleDefRepository: GrowbeModuleDefRepository,
    @repository(GrowbeModuleRepository)
    public moduleRepository: GrowbeModuleRepository,
    @repository(GrowbeSensorValueRepository)
    public sensorValueRepository: GrowbeSensorValueRepository,
    @service(MQTTService) public mqttService: MQTTService,
  ) {}

  async onModuleStateChange(
    boardId: string,
    moduleId: string,
    data: pb.ModuleData,
  ) {
    const module = await this.findOrCreate(boardId, moduleId);
    module.connected = data.plug;
    module.readCount = data.readCount;
    module.atIndex = data.atIndex;
    await this.moduleRepository.update(module);
    await this.mqttService.send(
      getTopic(boardId, `/cloud/m/${moduleId}/state`),
      JSON.stringify(module),
    );
  }

  async onModuleDataChange(boardId: string, moduleId: string, data: any) {
    const info = this.getModuleIdAndType(moduleId);

    // parsing of the data lol we i succeed
    const pbObjectName = mapType[info.id];
    if (!pbObjectName) {
      throw new Error('pbObjectName not found in map for ' + info.id);
    }

    const parseData = require('@growbe2/growbe-pb')[pbObjectName].decode(data);

    let value = new GrowbeSensorValue(
      Object.assign(parseData, {
        moduleType: info.id,
        moduleId: moduleId,
        growbeMainboardId: boardId,
        createdAt: new Date(),
      }),
    );
    delete value.id;
    value = await this.sensorValueRepository.create(value);
    await this.mqttService.send(
      getTopic(boardId, `/cloud/m/${moduleId}/data`),
      JSON.stringify(parseData),
    );
    return value;
  }

  async findOrCreate(boardId: string, moduleId: string) {
    let module: any = await this.moduleRepository.findOne({
      where: {uid: moduleId},
    });
    if (!module) {
      module = await this.createModule(boardId, moduleId);
      module.new = true;
    }
    return module;
  }

  private async createModule(boardId: string, moduleId: string) {
    const info = this.getModuleIdAndType(moduleId);
    const def = await this.moduleDefRepository.findOne({where: {id: info.id}});
    if (!def) {
      throw new Error(`def not found ${info.id} ${moduleId} ${boardId}`);
    }
    const module = (await this.moduleRepository.create({
      uid: moduleId,
      mainboardId: boardId,
      moduleName: def.id,
    })) as GrowbeModuleWithRelations;
    module.moduleDef = def;
    return module;
  }

  private getModuleIdAndType(id: string): {id: string; type: string} {
    return {
      id: id.substr(0, GrowbeModuleService.PREFIX_LENGTH),
      type: id.substr(
        GrowbeModuleService.PREFIX_LENGTH,
        GrowbeModuleService.SUFFIX_LENGTH,
      ),
    };
  }
}
