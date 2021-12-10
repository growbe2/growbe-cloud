import pb, {LocalConnection, RTCTime} from '@growbe2/growbe-pb';
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
import {GrowbeMainboardRepository} from '../repositories';
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

  async updateConfig(growbeId: string, config: pb.GrowbeMainboardConfig) {
    return this.mqttService.sendWithResponse(
      growbeId,
      getTopic(growbeId, '/board/config'),
      pb.GrowbeMainboardConfig.encode(config).finish(),
      {responseCode: pb.ActionCode.RTC_SET, waitingTime: 4000}
    ).toPromise()
      .then((responseA) => this.mainboardRepository
        .growbeMainboardConfig(growbeId)
        .patch({config})
        .then(response => {
          return this.logsService.addLog({
            group: GroupEnum.MAINBOARD,
            type: LogTypeEnum.GROWBE_CONFIG_CHANGE,
            severity: SeverityEnum.LOW,
            growbeMainboardId: growbeId,
            message: `config send`,
          }).then((log) => ({log, response: responseA}));
      }));
  }

  async updateLocalConnection(growbeId: string, data: LocalConnection) {
    const updatedConfig = await this.mainboardConfigRepository.updateAll(
      {
        localConnection: data
      },
      {
        growbeMainboardId: growbeId
      }
    )

    await this.mqttService.send(
      getTopic(growbeId, '/cloud/localconnection'),
      JSON.stringify(data),
    )

    await this.logsService.addLog({
      group: GroupEnum.MAINBOARD,
      type: LogTypeEnum.LOCAL_CONNECTION_UPDATED,
      severity: SeverityEnum.LOW,
      growbeMainboardId: growbeId,
      message: JSON.stringify(data),
    })

    return updatedConfig;
  }

  async setRTC(growbeId: string, rtcTime: RTCTime) {
    return this.mqttService
      .sendWithResponse(
        growbeId,
        getTopic(growbeId, '/board/setTime'),
        pb.RTCTime.encode(rtcTime).finish(),
        {
          responseCode: 3,
          waitingTime: 4000,
        }
      ).toPromise()
      .then(response => {
        return this.logsService.addLog({
          group: GroupEnum.MAINBOARD,
          type: LogTypeEnum.RTC_UPDATE,
          severity: SeverityEnum.LOW,
          growbeMainboardId: growbeId,
          message: `rtc set : ${JSON.stringify(rtcTime)}`,
        }).then((log) => ({log, response}));
      });
  }

  async sendRestartRequest(growbeId: string) {
    return this.mqttService
      .sendWithResponse(
        growbeId,
        getTopic(growbeId, '/board/restart'),
        pb.RestartRequest.encode({}).finish(),
        {
          responseCode: pb.ActionCode.RESTART,
          waitingTime: 4000,
        }
      ).toPromise();
  }

    /**
   * send request to growbe to ask to
   * sync all is modules informations
   * with the cloud , trigger on reconnection.
   * @param growbeId
   */
  public sendSyncRequest(growbeId: string) {
    return lastValueFrom(this.mqttService
      .sendWithResponse(growbeId,getTopic(growbeId, '/board/sync'), '', {
        responseCode: 11,
        waitingTime: 3000
      }))
      .then(value => {
        return this.logsService.addLog({
          group: GroupEnum.MAINBOARD,
          type: LogTypeEnum.SYNC_REQUEST,
          severity: SeverityEnum.LOW,
          growbeMainboardId: growbeId,
          message: `sync requested`,
        });
      });
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

    return mainboard;
  }
}
