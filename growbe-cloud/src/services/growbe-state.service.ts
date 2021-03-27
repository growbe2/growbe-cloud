import {HearthBeath} from '@growbe2/growbe-pb';
import {inject, BindingScope, injectable, service} from '@loopback/core';
import { Subject } from 'rxjs';
import {RTC_OFFSET_KEY} from '../data';
import { GrowbeMainboardBindings } from '../keys';
import {GrowbeMainboard} from '../models';
import { GroupEnum, LogTypeEnum, SeverityEnum } from '../models/growbe-logs.model';
import { GrowbeLogsService } from './growbe-logs.service';
import {GrowbeWarningService} from './growbe-warning.service';
import {GrowbeService} from './growbe.service';
import {getTopic, MQTTService} from './mqtt.service';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeStateService {
  static DEBUG = require('debug')('growbe:service:state');


  watcherMainboard: {[id: string]: NodeJS.Timeout} = {};

  constructor(
    @service(MQTTService) public mqttService: MQTTService,
    @service(GrowbeService) public growbeService: GrowbeService,
    @service(GrowbeWarningService) public warningService: GrowbeWarningService,
    @service(GrowbeLogsService) public logsService: GrowbeLogsService,
    @inject(GrowbeMainboardBindings.WATCHER_STATE_EVENT) private stateSubject: Subject<string>
  ) {}

  async onBeath(id: string) {
    this.stateSubject.next(id);
  }

  async valideState(id: string) {
    GrowbeStateService.DEBUG('Beath from', id);
    const mainboard = await this.growbeService.findOrCreate(id, {
      include: ['growbeMainboardConfig'],
    });

    const hearthBeathRate = mainboard.growbeMainboardConfig.config.hearthBeath;
    const receiveAt = new Date();
    //await this.validOffsetRTC(beath.rtc, mainboard.id, hearthBeathRate);
    // Si on change d'état notify par MQTT
    if (mainboard.state !== 'CONNECTED') {
      mainboard.state = 'CONNECTED';
      await this.notifyState(mainboard);
    }
    // Démarre un timer pour regarder si on a recu un autre beath
    if(this.watcherMainboard[id]) {
      clearTimeout(this.watcherMainboard[id]);
    }

    this.watcherMainboard[id] = setTimeout(async () => {
      // Regarde si on a été update depuis
      const b = await this.growbeService.mainboardRepository.findById(
        mainboard.id,
      );
        // na pas été update
        GrowbeStateService.DEBUG(`Growbe ${id} lost connection`);
        mainboard.state = 'DISCONNECTED';
        await this.notifyState(mainboard);
        await this.growbeService.mainboardRepository.updateById(id, {
          state: 'DISCONNECTED',
        });
        delete this.watcherMainboard[id];
    }, hearthBeathRate * 1000);
    await this.growbeService.mainboardRepository.updateById(id, {
      state: 'CONNECTED',
      lastUpdateAt: receiveAt,
    });
  }

  private notifyState(mainboard: GrowbeMainboard) {
    this.logsService.addLog({
      growbeMainboardId: mainboard.id,
      group: GroupEnum.MAINBOARD,
      severity: SeverityEnum.HIGH,
      type: LogTypeEnum.CONNECTION_STATE_CHANGE,
      message: `connected ${mainboard.state}`
    })
    return this.mqttService.send(
      getTopic(mainboard.id, '/cloud/state'),
      JSON.stringify({
        state: mainboard.state,
      }),
    );
  }

  private async validOffsetRTC(
    rtc: string,
    mainboardId: string,
    configHearthBeath: number,
  ) {
    const rtcDate = new Date(rtc).getTime();
    const currentDate = new Date().getTime();
    const timeDiff = currentDate - rtcDate;
    let state = undefined;
    if (timeDiff < 0) {
      state = 'advance';
    } else if ((configHearthBeath + 5) * 1000 < timeDiff) {
      state = 'late';
    }
    if (state) {
      await this.warningService.addWarning({
        growbeMainboardId: mainboardId,
        warningKeyId: RTC_OFFSET_KEY,
        data: {
          state,
        },
      });
    }
  }
}
