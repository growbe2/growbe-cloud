import pb, {ActionCode, LocalConnection, RTCTime} from '@growbe2/growbe-pb';
import {BindingScope, inject, injectable, service} from '@loopback/core';
import {
  Filter,
  FilterExcludingWhere,
  model,
  property,
  repository,
  Where,
} from '@loopback/repository';
import { cond } from 'lodash';
import { lastValueFrom } from 'rxjs';
import {GrowbeMainboardBindings} from '../keys';
import {GrowbeMainboard} from '../models';
import {
  GroupEnum,
  LogTypeEnum,
  SeverityEnum,
} from '../models/growbe-logs.model';
import {GrowbeMainboardConfig} from '../models/growbe-mainboard-config.model';
import {GrowbeMainboardConnectionInformationRepository, GrowbeMainboardRepository} from '../repositories';
import {GrowbeMainboardConfigRepository} from '../repositories/growbe-mainboard-config.repository';
import {GrowbeLogsService} from './growbe-logs.service';
import {getTopic, MQTTService} from './mqtt.service';

export enum GrowbeRegisterState {
  BEATH_UNREGISTER = 'BEATH_UNREGISTER',
  UNBEATH_REGISTER = 'UNBEATH_REGISTER',
  UNREGISTER = 'UNREGISTER',
  REGISTER = 'REGISTER',
  ALREADY_REGISTER = 'ALREADY_REGISTER',
  NOT_ACCESSIBLE = 'NOT_ACCESSIBLE',
  ALREADY_REGISTER_ORGANISATION = 'ALREADY_REGISTER_ORGANISATION',
  REGISTER_ORGANISATION = 'REGISTER_ORGANISATION',
}

@model()
export class GrowbeRegisterResponse {
  @property({jsonSchema: {enum: Object.values(GrowbeRegisterState)}})
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
  static DEBUG = require('debug')('growbe:service:growbe');
  constructor(
    @repository(GrowbeMainboardConnectionInformationRepository)
    public connectionInformationRepo: GrowbeMainboardConnectionInformationRepository,
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


  find(
    condition: Where<GrowbeMainboard>,
    filter: Filter<GrowbeMainboard> = {}
  ) {
    filter.where = Object.assign(filter.where ?? {}, condition);
    return this.mainboardRepository.find(filter);
  }

  count(
    condition: Where<GrowbeMainboard>,
    where: Where<GrowbeMainboard> = {}
  ) {
    return this.mainboardRepository.count(Object.assign(where, condition));
  }

  async findOrCreate(
    id: string,
    filter: FilterExcludingWhere<GrowbeMainboard> = {},
  ): Promise<GrowbeMainboard & {new?: boolean}> {
    let mainboard: any = await this.mainboardRepository.findOne(
      Object.assign(filter, {where: {id}}),
    );
    if (!mainboard) {
      mainboard = await this.createMainboard(id);
      mainboard.new = true;
    }
    return mainboard;
  }

  async updateProcessConfig(growbeId: string, processConfig: pb.MainboardConfig) {
    const config = {...processConfig, updatedAt: new Date()};
    
    await this.mainboardConfigRepository.updateAll({
      processConfig: config,
    },{
      growbeMainboardId: growbeId 
    })


    await this.mqttService.send(
      getTopic(growbeId, '/cloud/processconfig'),
      JSON.stringify(processConfig)
    )

    await this.logsService.addLog({
      group: GroupEnum.MAINBOARD,
      type: LogTypeEnum.LOCAL_CONNECTION_UPDATED,
      severity: SeverityEnum.LOW,
      growbeMainboardId: growbeId,
      message: 'receive config from mainboard',
    })
  }

  async updateLocalConnection(growbeId: string, data: any) {
    if (!data.ssid || data.ssid === "") {
      GrowbeService.DEBUG("invalid local connection receive " + growbeId);
      return {};
    }


    const conn = {...data, updatedAt: new Date()};

    const updatedConfig = await this.mainboardConfigRepository.updateAll(
      {
        localConnection: conn
      },
      {
        growbeMainboardId: growbeId
      }
    )

    await this.mqttService.send(
      getTopic(growbeId, '/cloud/localconnection'),
      JSON.stringify(conn),
    )

    await this.logsService.addLog({
      group: GroupEnum.MAINBOARD,
      type: LogTypeEnum.LOCAL_CONNECTION_UPDATED,
      severity: SeverityEnum.LOW,
      growbeMainboardId: growbeId,
      message: JSON.stringify(conn),
    })

    return updatedConfig;
  }

  async register(userId: string, request: GrowbeRegisterRequest) {
    const response = new GrowbeRegisterResponse();
    const mainboard = await this.findOrCreate(request.id);
    if (mainboard.new === true) {
      response.state = GrowbeRegisterState.UNBEATH_REGISTER;
      await this.mainboardRepository.updateById(request.id, {userId});
    } else if (!mainboard.userId) {
      response.state = GrowbeRegisterState.REGISTER;
      await this.mainboardRepository.updateById(request.id, {userId});
    } else {
      response.state = GrowbeRegisterState.ALREADY_REGISTER;
    }
    response.growbe = mainboard;
    return response;
  }

  async registerOrganisation(userId: string, growbeId: string, organisationId: string) {
    const response = new GrowbeRegisterResponse();
    const mainboard = await this.mainboardRepository.findOne({where: {userId, id: growbeId}});
    if (!mainboard) {
      response.state = GrowbeRegisterState.NOT_ACCESSIBLE;
    } else if (mainboard.organisationId) {
      response.state = GrowbeRegisterState.ALREADY_REGISTER_ORGANISATION;
      response.growbe = mainboard;
    } else {
      await this.mainboardRepository.updateById(growbeId, {organisationId});
      mainboard.organisationId = organisationId;
      response.state = GrowbeRegisterState.REGISTER_ORGANISATION;
      response.growbe = mainboard;
    }
    return response;
  }

  async getGrowbeByProfile(
    userId: string,
    filter: FilterExcludingWhere<GrowbeMainboard> = {},
  ) {
    return this.mainboardRepository.find(
      Object.assign(filter, {where: {userId}}),
    );
  }

  /**
   * CreateMainboard
   *  * crée une mainboard
   *  * crée une config par default
   * @param id
   * @param name
   */
  private async createMainboard(id: string, name?: string) {
    const mainboard = await this.mainboardRepository.create({id, name});
    mainboard.growbeMainboardConfig = await this.mainboardConfigRepository.create(
      {config: this.defaultConfig, growbeMainboardId: mainboard.id},
    );

    mainboard.connectionInformation = await this.connectionInformationRepo.create(
      {growbeMainboardId: id}
    );

    return mainboard;
  }
}
