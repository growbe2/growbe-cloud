import {HelloWord, LocalConnection} from '@growbe2/growbe-pb';
import {BindingScope, inject, injectable, service} from '@loopback/core';
import * as _ from 'lodash';
import {lastValueFrom, Subject} from 'rxjs';
import {RTC_OFFSET_KEY} from '../data';
import {GrowbeMainboardBindings} from '../keys';
import {GrowbeMainboard} from '../models';
import {
  GroupEnum,
  LogTypeEnum,
  SeverityEnum,
} from '../models/growbe-logs.model';
import {GrowbeLogsService} from './growbe-logs.service';
import {GrowbeModuleService} from './growbe-module.service';
import { GrowbeSyncService } from './growbe-sync.service';
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
    @service(GrowbeModuleService)
    public growbeModuleService: GrowbeModuleService,
    @service(GrowbeWarningService) public warningService: GrowbeWarningService,
    @service(GrowbeLogsService) public logsService: GrowbeLogsService,
    @service(GrowbeSyncService)
    private growbeSyncService: GrowbeSyncService,
    @inject(GrowbeMainboardBindings.WATCHER_STATE_EVENT)
    private stateSubject: Subject<string>,
  ) {}

  async onBeath(id: string) {
    this.stateSubject.next(id);
  }

  async onHelloWorld(id: string, helloWorld: HelloWord) {
    this.stateSubject.next(id);
    const mainboard = await this.growbeService.findOrCreate(id, {
      include: ['growbeMainboardConfig'],
    });
    await this.validOffsetRTC(
      helloWorld.RTC,
      id,
      mainboard.growbeMainboardConfig.config.hearthBeath,
    );
    mainboard.cloudVersion = helloWorld.cloudVersion;
    mainboard.version = helloWorld.version;
    mainboard.lastUpdateAt = new Date();
    mainboard.state = 'CONNECTED';
    await this.stateChange(mainboard);
    await this.notifyState(
      new GrowbeMainboard(_.omit(mainboard, 'growbeMainboardConfig')),
    );
    await this.growbeSyncService.syncConfig(mainboard.id);
  }

  async valideState(id: string) {
    const mainboard = await this.growbeService.findOrCreate(id, {
      include: ['growbeMainboardConfig'],
    });

    const hearthBeathRate = mainboard.growbeMainboardConfig.config.hearthBeath;
    const receiveAt = new Date();
    // Si on change d'état notify par MQTT
    if (mainboard.state !== 'CONNECTED') {
      mainboard.state = 'CONNECTED';
      await this.stateChange(
        _.omit(mainboard, 'growbeMainboardConfig') as GrowbeMainboard,
      );
      this.growbeService.sendSyncRequest(mainboard.id).then(() => {});
    }
    await this.notifyState(
      new GrowbeMainboard({
        id: mainboard.id,
        state: mainboard.state,
        lastUpdateAt: receiveAt,
      }),
    );

    // Démarre un timer pour regarder si on a recu un autre beath
    if (this.watcherMainboard[id]) {
      clearTimeout(this.watcherMainboard[id]);
    }

    this.watcherMainboard[id] = setTimeout(() => {
      (async () => {
        // Regarde si on a été update depuis
        const mainboardNew = await this.growbeService.mainboardRepository.findById(
          mainboard.id,
        );
        // na pas été update
        GrowbeStateService.DEBUG(`Growbe ${id} lost connection`);
        mainboardNew.state = 'DISCONNECTED';
        await this.stateChange(mainboardNew);
        await this.notifyState(mainboardNew);
        await this.growbeModuleService.onBoardDisconnect(mainboardNew.id);
        delete this.watcherMainboard[id];
      })().then(
        () => {},
        () => {},
      );
    }, hearthBeathRate * 2000);
  }

  private stateChange(mainboard: GrowbeMainboard) {
    return this.logsService.addLog({
      growbeMainboardId: mainboard.id,
      group: GroupEnum.MAINBOARD,
      severity: SeverityEnum.HIGH,
      type: LogTypeEnum.CONNECTION_STATE_CHANGE,
      message: `connected ${mainboard.state}`,
    });
  }

  /**
   * notify a state change for a Growbe (CONNECTED and DISCONNECTED)
   * @param mainboard
   */
  private async notifyState(mainboard: GrowbeMainboard) {
    await this.growbeService.mainboardRepository.updateById(
      mainboard.id,
      mainboard,
    );
    return this.mqttService.send(
      getTopic(mainboard.id, '/cloud/state'),
      JSON.stringify(new GrowbeMainboard(mainboard)),
    );
  }

  /**
   * valid if the RTC clock time is the same that
   * the one in the computer and create a warning
   * if different
   * @param rtc of the mainboard
   * @param mainboardId if of the mainboard
   * @param configHearthBeath the hearthbeathRate config
   */
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
