import {HearthBeath} from '@growbe2/growbe-pb';
import {/* inject, */ BindingScope, injectable, service} from '@loopback/core';
import {RTC_OFFSET_KEY} from '../data';
import {GrowbeMainboard} from '../models';
import {GrowbeWarningService} from './growbe-warning.service';
import {GrowbeService} from './growbe.service';
import {getTopic, MQTTService} from './mqtt.service';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeStateService {
  static DEBUG = require('debug')('growbe:service:state');

  constructor(
    @service(MQTTService) public mqttService: MQTTService,
    @service(GrowbeService) public growbeService: GrowbeService,
    @service(GrowbeWarningService) public warningService: GrowbeWarningService,
  ) {}

  async onBeath(id: string, beath: HearthBeath) {
    GrowbeStateService.DEBUG('Beath from', id, beath);
    const mainboard = await this.growbeService.findOrCreate(id, {
      include: ['growbeMainboardConfig'],
    });

    const hearthBeathRate = mainboard.growbeMainboardConfig.config.hearthBeath;
    await this.validOffsetRTC(beath.rtc, mainboard.id, hearthBeathRate);
    // Si on change d'état notify par MQTT
    if (mainboard.state !== 'CONNECTED') {
      mainboard.state = 'CONNECTED';
      await this.notifyState(mainboard, beath);
    }
    // Démarre un timer pour regarder si on a recu un autre beath
    setTimeout(async () => {
      // Regarde si on a été update depuis
      const b = await this.growbeService.mainboardRepository.findById(
        mainboard.id,
      );
      if (b.lastUpdateAt.rtc === beath.rtc) {
        // na pas été update
        GrowbeStateService.DEBUG(`Growbe ${id} lost connection`);
        mainboard.state = 'DISCONNECTED';
        await this.notifyState(mainboard, beath);
        await this.growbeService.mainboardRepository.updateById(id, {
          state: 'DISCONNECTED',
          lastUpdateAt: beath,
        });
      }
    }, hearthBeathRate * 2000);
    return this.growbeService.mainboardRepository.updateById(id, {
      state: 'CONNECTED',
      lastUpdateAt: beath,
    });
  }

  private notifyState(mainboard: GrowbeMainboard, beath: HearthBeath) {
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
