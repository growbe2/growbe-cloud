import pb, {RTCTime} from '@growbe2/growbe-pb';
import {BindingScope, inject, injectable, service} from '@loopback/core';
import {
  FilterExcludingWhere,
  model,
  property,
  repository,
} from '@loopback/repository';
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

export type GrowbeRegisterState =
  | 'BEATH_UNREGISTER'
  | 'UNBEATH_REGISTER'
  | 'UNREGISTER'
  | 'REGISTER'
  | 'ALREADY_REGISTER';

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
      })
      .catch((error) => {
        return error;
      });
  }

  async register(userId: string, request: GrowbeRegisterRequest) {
    const response = new GrowbeRegisterResponse();
    const mainboard = await this.findOrCreate(request.id);
    if (mainboard.new === true) {
      response.state = 'UNBEATH_REGISTER';
      await this.mainboardRepository.updateById(request.id, {userId});
    } else if (!mainboard.userId) {
      response.state = 'REGISTER';
      await this.mainboardRepository.updateById(request.id, {userId});
    } else {
      response.state = 'ALREADY_REGISTER';
    }
    response.growbe = mainboard;
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
