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
          responseCode: pb.ActionCode.SYNC_REQUEST,
          waitingTime: 4000,
        }
      ).toPromise().then(value => {
        return this.logsService.addLog({
          group: GroupEnum.MAINBOARD,
          type: 'request' as any,
          severity: SeverityEnum.LOW,
          growbeMainboardId: growbeId,
          message: `request restart`,
        });
      });
  }

  async sendRebootRequest(growbeId: string) {
    return this.mqttService
      .sendWithResponse(
        growbeId,
        getTopic(growbeId, '/board/reboot'),
        pb.RestartRequest.encode({}).finish(),
        {
          responseCode: pb.ActionCode.SYNC_REQUEST,
          waitingTime: 3000,
        }
      ).toPromise().then(value => {
        return this.logsService.addLog({
          group: GroupEnum.MAINBOARD,
          type: 'request' as any,
          severity: SeverityEnum.LOW,
          growbeMainboardId: growbeId,
          message: `request reboot`,
        });
      });
  }

  public sendProcessConfig(growbeId: string, config: pb.MainboardConfig) {
    return lastValueFrom(
      this.mqttService.sendWithResponse(growbeId, getTopic(growbeId, '/board/boardconfig'), pb.MainboardConfig.encode(config).finish(), {
        responseCode: pb.ActionCode.SYNC_REQUEST,
        waitingTime: 4000
      })
    ).then(value => {
      return this.logsService.addLog({
        group: GroupEnum.MAINBOARD,
        type: 'config' as any,
        severity: SeverityEnum.LOW,
        growbeMainboardId: growbeId,
        message: 'process config updated'
      })
    })
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
        responseCode: ActionCode.SYNC_REQUEST,
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


  async sendLocalConnectionRequest(growbeId: string) {
    return lastValueFrom(this.mqttService
      .sendWithResponse(growbeId,getTopic(growbeId, '/board/localconnection'), '', {
        responseCode: ActionCode.SYNC_REQUEST,
        waitingTime: 3000
      }))
      .then(value => {
        return this.logsService.addLog({
          group: GroupEnum.MAINBOARD,
          type: 'request' as any,
          severity: SeverityEnum.LOW,
          growbeMainboardId: growbeId,
          message: `request local connection`,
        });
      });
  }

  async sendHelloWorldRequest(growbeId: string) {
    return lastValueFrom(this.mqttService
      .sendWithResponse(growbeId,getTopic(growbeId, '/board/helloworld'), '', {
        responseCode: ActionCode.SYNC_REQUEST,
        waitingTime: 3000
      }))
      .then(value => {
        return this.logsService.addLog({
          group: GroupEnum.MAINBOARD,
          type: 'request' as any,
          severity: SeverityEnum.LOW,
          growbeMainboardId: growbeId,
          message: `request hello world`,
        });
      });
  }

}
