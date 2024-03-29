import * as pb from '@growbe2/growbe-pb';
import {BindingScope, config, inject, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {addMinutes} from 'date-fns';
import {Subject} from 'rxjs';
import {GrowbeMainboardBindings} from '../keys';
import {
  GrowbeModule,
  GrowbeModuleWithRelations,
  GrowbeSensorValue,
  GrowbeSensorValueWithRelations
} from '../models';
import {
  GroupEnum,
  LogTypeEnum,
  SeverityEnum
} from '../models/growbe-logs.model';
import {
  GrowbeModuleDefRepository,
  GrowbeModuleRepository,
  GrowbeSensorValueRepository
} from '../repositories';
import {GrowbeLogsService} from './growbe-logs.service';
import {GrowbeModuleDefService} from './growbe-module-def.service';
import {getTopic, MQTTService} from './mqtt.service';

const pbDef = require('@growbe2/growbe-pb');

const mapType: any = {
  AAA: 'THLModuleData',
  AAS: 'SOILModuleData',
  AAB: 'WCModuleData',
  AAP: 'RelayModuleData',


  PCS: 'PhoneStreamingData',
  PPR: 'PhonePressureData',
  PAC: 'PhoneAccelerationData',
  PAL: 'PhoneAmbientLightData',
  PPO: 'PhonePositionData',

  CCS: 'ComputerStreamingData',
  CSS: 'ComputerStatsData',
};

const mapTypeConfig: any = {
  AAB: 'WCModuleConfig',
  AAP: 'RelayModuleConfig',
  AAS: 'SOILModuleConfig',

  PCS: 'PhoneStreamingConfig',
  PPR: 'PhonePressureConfig',
  PAC: 'PhoneAccelerationConfig',
  PAL: 'PhoneAmbientLightConfig',
  PPO: 'PhonePositionConfig',

  CCS: 'ComputerStreamingConfig',
  CSS: 'ComputerStatsConfig',
};

const mapTypeConfiguration: any = {
  AAB: {
    disableAverage: true
  },
  AAP: {
    disableAverage: true
  },
}

export class ModuleDataCache {

    moduleData: {[moduleId: string]: GrowbeSensorValue}

    constructor() {
        this.moduleData = {};
    }

    getModuleData(moduleId: string, currentTimestamp: number): GrowbeSensorValue | undefined {
        const moduleData = this.moduleData[moduleId];
        if (moduleData && moduleData.createdAt <= currentTimestamp && moduleData.endingAt >= currentTimestamp) {
            return moduleData;
        }
        return undefined;
    }

    storeModuleData(value: GrowbeSensorValue): void {
        this.moduleData[value.moduleId] = value;
    }

    clear() {
        this.moduleData = {};
    }
}


const removeNullProperty = (obj: any) => {
  return Object.fromEntries(Object.entries(obj).filter((_,v) => v !== null && v !== undefined))
}

@injectable({scope: BindingScope.SINGLETON})
export class GrowbeModuleService {
  static PREFIX_LENGTH = 3;
  static SUFFIX_LENGTH = 9;


  moduleDataCache = new ModuleDataCache();

  constructor(
    @repository(GrowbeModuleDefRepository)
    public moduleDefRepository: GrowbeModuleDefRepository,
    @repository(GrowbeModuleRepository)
    public moduleRepository: GrowbeModuleRepository,
    @repository(GrowbeSensorValueRepository)
    public sensorValueRepository: GrowbeSensorValueRepository,
    @service(MQTTService) public mqttService: MQTTService,
    @service(GrowbeLogsService) public logsService: GrowbeLogsService,
    @service(GrowbeModuleDefService)
    private growbeModuleDefService: GrowbeModuleDefService,
    @inject(GrowbeMainboardBindings.WATCHER_STATE_EVENT)
    private stateSubject: Subject<string>,
  ) {}

  /**
   * trigger when a growbe lose connection,
   * change the status off all the module to false
   * @param growbeId growbe id
   */
  async onBoardDisconnect(growbeId: string) {
    const modules = await this.moduleRepository.find({
      where: {
        mainboardId: growbeId,
        connected: true,
      },
    });
    for (const module of modules) {
      module.connected = false;
      await this.updateModuleState(growbeId, module);
    }
  }

  async onModuleStateChange(
    boardId: string,
    moduleId: string,
    data: pb.ModuleData,
  ) {
    this.stateSubject.next(boardId);
    const module = await this.findOrCreate(boardId, moduleId);
    // validated that value really change , because the send more info sometime
    if (module.connected !== data.plug) {
      module.connected = data.plug;
      module.readCount = data.readCount;
      module.atIndex = data.atIndex;
      module.board = data.board;
      module.boardAddr = data.boardAddr;
      module.updatedAt = new Date();
      await this.updateModuleState(boardId, module);
    }
  }

  async onModuleDataChange(boardId: string, moduleId: string, data: any) {
    this.stateSubject.next(boardId);
    const info = this.getModuleIdAndType(moduleId);

    // parsing of the data lol we i succeed
    const configuration = mapTypeConfiguration[info.id];
    const pbObjectName = mapType[info.id];
    if (!pbObjectName) {
      throw new Error('pbObjectName not found in map for ' + info.id);
    }

    const parseData = pbDef[pbObjectName].decode(data);


    const currentTime = (parseData.timestamp) ? parseData.timestamp * 1000: Date.now();

    let document: (GrowbeSensorValueWithRelations) | null = null;

    if (!configuration?.disableAverage) {
      document = this.moduleDataCache.getModuleData(moduleId, currentTime) || 
        await this.sensorValueRepository.findOne({
        where: {
            and: [
            {
              moduleId,
            },
            {
              createdAt: {
                lte: currentTime,
              },
            },
            {
              endingAt: {
                gte: currentTime,
              },
            },
          ],
        },
      });
    }

    if (!document) {
      document = new GrowbeSensorValue({
        moduleId,
        moduleType: info.id,
        growbeMainboardId: boardId,
        createdAt: currentTime,
        endingAt: addMinutes(currentTime, 1).getTime(),
        values: undefined,
        samples: [],
      });
    }

    const values = Object.assign(parseData, {createdAt: currentTime});

    // if there is value add to samples
    if (document.values) {
      document.samples.push(document.values);
    }

    document.values = values;

    if (document.id) {
      await this.sensorValueRepository.updateById(document.id, {
        samples: document.samples,
        values: document.values,
      });
    } else {
      document = await this.sensorValueRepository.create(document);
    }

    this.moduleDataCache.storeModuleData(document);

    await this.mqttService.send(
      getTopic(boardId, `/cloud/m/${moduleId}/data`),
      JSON.stringify(parseData),
    );

    await this.mqttService.send(
      getTopic(boardId, `/cloud/m/${moduleId}/fdata`),
      JSON.stringify(document)
    );
    
    return document;
  }

  async findOrCreate(boardId: string, moduleId: string) {
    let module: any = await this.moduleRepository.findOne({
      where: {id: moduleId},
    });
    if (!module) {
      module = await this.createModule(boardId, moduleId);
      module.new = true;
    }
    return module;
  }

  async setModuleConfigForProperty(id: string, property: string, config: any, direct: boolean) {
    const module = await this.moduleRepository.findById(id);
    if (!module) {
      throw new HttpErrors[404]();
    }
    if (!module.config) module.config = {};
    module.config[property] = config;
    // remove property with null config
    // NEED TO REMWORK TO USE SAME CODE AS UPDATED_CONFIG WITH THE MQTT SEND
    const ret = this.sendConfigToMainboard(module, direct);

    //await this.moduleRepository.update(module);

    return ret;
  }

  async setModuleConfig(id: string, config: any, direct: boolean) {
    let module = await this.getUpdateModuleConfig(id, config);

    const ret = this.sendConfigToMainboard(module, direct);

    //await this.updateModuleConfig(id, module);

    return ret;
  }

  async syncModulesConfig(growbeId: string, connected?: boolean, direct?: boolean) {
    const modules = await this.moduleRepository.find({
      where: { mainboardId: growbeId, config: { neq: null } },
    });
    for (const module of modules) {
      await this.sendConfigToMainboard(module, direct);
    }
  }

  async receivedConfigFromMainboard(moduleId: string, dataConfig: any) {
    const model = pbDef[mapTypeConfig[moduleId.slice(0, 3)]];
    const config = model.toObject(model.decode(dataConfig));

    console.log('CONFIG decocded proto ', config);

    let module = await this.getUpdateModuleConfig(moduleId, config);

    console.log('UPDATED MODULE CONFIG', module);
    return this.updateModuleConfig(moduleId, module);
  }

  async deleteModuleConfig(moduleId: string, direct?: boolean) {
    const module = await this.moduleRepository.findById(moduleId);
    if (!module) {
      throw new HttpErrors[404]();
    }
    module.config = null;
    
    await this.moduleRepository.update(module);
     await this.mqttService.send(
      getTopic(module.mainboardId, `/cloud/m/${module.id}/config`),
      JSON.stringify({}),
    );

    return this.mqttService
      .sendWithResponse(
        module.mainboardId,
        getTopic(module.mainboardId, `/board/rmconfig/${module.id}`),
        {},
        { waitingTime: 6000, responseCode: pb.ActionCode.MODULE_CONFIG},
        undefined,
        direct,
      ).toPromise()
      .then((response) => {
        return this.logsService.addLog({
          group: GroupEnum.MODULES,
          type: LogTypeEnum.MODULE_CONFIG_CHANGE,
          severity: SeverityEnum.LOW,
          growbeMainboardId: module.mainboardId,
          growbeModuleId: module.id,
          message: '',
        }).then((log) => ({log, response}));
      });
   
  }

  
  private async getUpdateModuleConfig(id: string, config: any) {
    const module = await this.moduleRepository.findById(id);
    if (!module) {
      throw new HttpErrors[404]();
    }
    if (!module.config) module.config = {};
    Object.entries(config).forEach(([k,v]) => {
      if (v === null || v === undefined) return;
      module.config[k] = v;
    });

    return module;
  }

  private async updateModuleConfig(id: string, module: GrowbeModule) {
   // remove property with null config
    
    await this.moduleRepository.update(module);
    await this.mqttService.send(
      getTopic(module.mainboardId, `/cloud/m/${module.id}/config`),
      JSON.stringify(module.config),
    );

    return module;
  }

  private sendConfigToMainboard(module: GrowbeModule, direct?: boolean) {
     const model = pbDef[mapTypeConfig[module.id.slice(0, 3)]];
     const payload = model.encode(module.config).finish();
     return this.mqttService
      .sendWithResponse(
        module.mainboardId,
        getTopic(module.mainboardId, `/board/mconfig/${module.id}`),
        payload,
        { waitingTime: 6000, responseCode: pb.ActionCode.MODULE_CONFIG},
        undefined,
        direct
      ).toPromise()
      .then((response) => {
        return this.logsService.addLog({
          group: GroupEnum.MODULES,
          type: LogTypeEnum.MODULE_CONFIG_CHANGE,
          severity: SeverityEnum.LOW,
          growbeMainboardId: module.mainboardId,
          growbeModuleId: module.id,
          message: '',
        }).then((log) => ({log, response}));
      });
  }

  private async updateModuleState(growbeId: string, module: GrowbeModule) {
    await this.moduleRepository.update(module);
    await this.mqttService.send(
      getTopic(growbeId, `/cloud/m/${module.id}/state`),
      JSON.stringify(module),
    );
    await this.logsService.addLog({
      growbeMainboardId: growbeId,
      severity: SeverityEnum.LOW,
      growbeModuleId: growbeId,
      type: LogTypeEnum.MODULE_STATE_CHANGE,
      group: GroupEnum.MAINBOARD,
      message: `connected: ${module.connected} index: ${module.atIndex}`,
    });
  }

  private async createModule(boardId: string, moduleId: string) {
    const info = this.getModuleIdAndType(moduleId);
    let def = await this.moduleDefRepository.findOne({where: {moduleId: info.id}});
    if (!def) {
      throw new Error(`def not found ${info.id} ${moduleId} ${boardId}`);
    }
    const module = (await this.moduleRepository.create({
      id: moduleId,
      mainboardId: boardId,
    })) as GrowbeModuleWithRelations;
    def = await this.growbeModuleDefService.createMainboardModuleDef(def, moduleId, boardId);
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
