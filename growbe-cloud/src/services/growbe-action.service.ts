import pb, {ActionCode, LocalConnection, RTCTime} from '@growbe2/growbe-pb';
import {BindingScope, inject, injectable, service} from '@loopback/core';
import {
  repository,
} from '@loopback/repository';
import { lastValueFrom } from 'rxjs';
import {
  GroupEnum,
  LogTypeEnum,
  SeverityEnum,
} from '../models/growbe-logs.model';
import {GrowbeMainboardRepository} from '../repositories';
import {GrowbeMainboardConfigRepository} from '../repositories/growbe-mainboard-config.repository';
import {GrowbeLogsService} from './growbe-logs.service';
import {getTopic, MQTTService} from './mqtt.service';


@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeActionService {
  constructor(
    @repository(GrowbeMainboardRepository)
    public mainboardRepository: GrowbeMainboardRepository,
    @repository(GrowbeMainboardConfigRepository)
    public mainboardConfigRepository: GrowbeMainboardConfigRepository,
    @service(MQTTService)
    private mqttService: MQTTService,
    @service(GrowbeLogsService)
    private logsService: GrowbeLogsService,
  ) {}

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
    return this.sendRequest({
        growbeId,
        topic: '/board/setTime',
        payload: pb.RTCTime.encode(rtcTime).finish(),
        log: () => ({ message: `rtc set : ${JSON.stringify(rtcTime)}`, type: LogTypeEnum.RTC_UPDATE }),
    });
  }


  async sendUpdateRequest(growbeId: string) {
    return this.sendRequest({
        growbeId,
        topic: '/board/update/request',
        log: () => ({ message: 'send request to perform update', type: 'update' }),
    });
  }

  async sendRestartRequest(growbeId: string) {
    return this.sendRequest({
        growbeId,
        topic: '/board/restart',
        payload: pb.RestartRequest.encode({}).finish(),
        log: () => ({ message: 'send request to perform restart of process', type: 'request' }),
    });
  }

  async sendRebootRequest(growbeId: string) {
    return this.sendRequest({
        growbeId,
        topic: '/board/reboot',
        payload: pb.RestartRequest.encode({}).finish(),
        log: () => ({ message: 'send request to perform a reboot', type: 'request' }),
    });
  }

  public sendProcessConfig(growbeId: string, config: pb.MainboardConfig) {
    return this.sendRequest({
        growbeId,
        topic: '/board/boardconfig',
        payload: pb.MainboardConfig.encode(config).finish(),
        log: () => ({ message: 'process config updated', type: 'config' }),
    });
  }

  public sendSyncRequest(growbeId: string) {
    return this.sendRequest({
        growbeId,
        topic: '/board/sync',
        log: () => ({ message: 'send request to perform a sync', type: 'request' }),
    });
  }


  async sendLocalConnectionRequest(growbeId: string) {
    return this.sendRequest({
        growbeId,
        topic: '/board/localconnection',
        log: () => ({ message: 'send request to perform a update of localconnection', type: 'request' }),
    });
  }

  async sendHelloWorldRequest(growbeId: string) {
    return this.sendRequest({
        growbeId,
        topic: '/board/helloworld',
        waitingTime: 3000,
        log: () => ({
            type: 'request',
            message: 'request hello world',
        })
    });
  }

  public async sendRequest(data: {growbeId: string, topic: string, payload?: any, responseCode?: any, waitingTime?: number,  log?: (d: any) => any}) {
    let growbeId = data.growbeId;
    let topic = data.topic;
    let payload = data.payload || '';
    let responseCode = data.responseCode || pb.ActionCode.SYNC_REQUEST;
    let waitingTime = data.waitingTime || 4000;
    let log_callback = data.log ? data.log : (() => ({}));

    return lastValueFrom(
      this.mqttService.sendWithResponse(growbeId, getTopic(growbeId, topic), payload, {
        responseCode,
        waitingTime
      })
    ).then(value => {
      return this.logsService.addLog(Object.assign({
       group: GroupEnum.MAINBOARD,
        severity: SeverityEnum.LOW,
        growbeMainboardId: growbeId,
      }, log_callback(value)));
    });
  }
}
