import {HelloWord} from '@growbe2/growbe-pb';
import {BindingScope, inject, injectable, service} from '@loopback/core';
import * as _ from 'lodash';
import {Subject} from 'rxjs';
import {GrowbeMainboardBindings} from '../keys';
import {GrowbeMainboard, GrowbeMainboardConnectionInformation, GrowbeMainboardWithRelations} from '../models';
import {
  GroupEnum,
  LogTypeEnum,
  SeverityEnum,
} from '../models/growbe-logs.model';
import {GrowbeLogsService} from './growbe-logs.service';
import {GrowbeModuleService} from './growbe-module.service';
import {GrowbeWarningService} from './growbe-warning.service';
import { GrowbeActionService } from './growbe-action.service';
import {GrowbeService} from './growbe.service';
import {getTopic, MQTTService} from './mqtt.service';
import { isBefore } from 'date-fns';

@injectable({scope: BindingScope.TRANSIENT})
export class GrowbeStateService {
  static DEBUG = require('debug')('growbe:service:state');

  watcherMainboard: {[id: string]: NodeJS.Timeout} = {};

  cacheMainboard: {[id: string]: GrowbeMainboard} = {};

  constructor(
    @service(MQTTService) public mqttService: MQTTService,
    @service(GrowbeService) public growbeService: GrowbeService,
    @service(GrowbeModuleService)
    public growbeModuleService: GrowbeModuleService,
    @service(GrowbeWarningService) public warningService: GrowbeWarningService,
    @service(GrowbeLogsService) public logsService: GrowbeLogsService,
    @service(GrowbeActionService) public growbeActionService: GrowbeActionService,
    @inject(GrowbeMainboardBindings.WATCHER_STATE_EVENT)
    private stateSubject: Subject<string>,
  ) {}

  // call this on app restart to clean data if the watcher
  // was not running correctly before.
  async onAppRestart() {
    const one_minute_ago = new Date();
    one_minute_ago.setMinutes(one_minute_ago.getMinutes() - 1);
    for (let x of (await this.growbeService.mainboardRepository.find({include: ['connectionInformation']}))
      .filter(x => isBefore(x.connectionInformation.lastUpdateAt, one_minute_ago))) {
        x.connectionInformation.state = 'DISCONNECTED';
        await this.logStateChange(x.id, x.connectionInformation.state);
        await this.notifyState(x, { connectionInformation: true });
        await this.growbeModuleService.onBoardDisconnect(x.id);
        GrowbeStateService.DEBUG("disconnecting on restart : " + x.id)
    }
  }

  async onBeath(id: string) {
    this.stateSubject.next(id);
  }

  async onHelloWorld(id: string, helloWorld: HelloWord) {
    this.stateSubject.next(id);
    let mainboard = await this.getMainboard(id);
    
    mainboard.cloudVersion = helloWorld.cloudVersion;
    mainboard.version = helloWorld.version;
    mainboard.boards = helloWorld.boards;
    mainboard.host = helloWorld.host;

    this.cacheMainboard[id] = mainboard as GrowbeMainboardWithRelations;

    await this.notifyState(
      new GrowbeMainboard(_.omit(mainboard, 'growbeMainboardConfig', 'connectionInformation')),
      { mainboard: true }
    );
    
    return mainboard;
  }

  async onGrowbeDisconnectEvent(id: string) {
        const mainboardNew = await this.growbeService.mainboardRepository.findById(
          id,
          { include: ['connectionInformation']}
        );
        // na pas été update
        GrowbeStateService.DEBUG(`Growbe ${id} has send a disconnect event`);
        mainboardNew.connectionInformation.state = 'DISCONNECTED';
        await this.logStateChange(mainboardNew.id, mainboardNew.connectionInformation.state);
        await this.notifyState(mainboardNew, { connectionInformation: true });
        await this.growbeModuleService.onBoardDisconnect(id);

        delete this.cacheMainboard[id];
        delete this.watcherMainboard[id];
  }

  // this is call on receiving most message
  async valideState(id: string) {
    let mainboard = await this.getMainboard(id);
    
    const hearthBeathRate = mainboard.growbeMainboardConfig.config.hearthBeath;
    const receiveAt = new Date();
    // Si on change d'état notify par MQTT

    if (mainboard.connectionInformation.state !== 'CONNECTED') {
      GrowbeStateService.DEBUG(`Growbe ${id} connected`);
      mainboard.connectionInformation.state = 'CONNECTED';
      this.cacheMainboard[mainboard.id] = mainboard as any;
      await this.logStateChange(
        mainboard.id,
        mainboard.connectionInformation.state,
      );
      this.growbeActionService.sendSyncRequest(mainboard.id, mainboard.growbeMainboardConfig?.config?.preferedCommandConnection == 1)
        .then(() => {})
        .catch((e) => {
          GrowbeStateService.DEBUG(`failed to send sync : ${JSON.stringify(e)}`)
        });
    }

    mainboard.connectionInformation.lastUpdateAt = receiveAt;

    await this.notifyState(
      mainboard,
      { connectionInformation: true, }
    );
    // Démarre un timer pour regarder si on a recu un autre beath
    if (this.watcherMainboard[id]) {
      clearTimeout(this.watcherMainboard[id]);
    }

    this.watcherMainboard[id] = setTimeout(() => {
      (async () => {
        // Regarde si on a été update depuis
        const connectionInformationNew = await this.growbeService.connectionInformationRepo.findOne({where: {growbeMainboardId: id}});
        if (!connectionInformationNew) {
            return;
        }
        // na pas été update
        GrowbeStateService.DEBUG(`Growbe ${id} lost connection`);
        connectionInformationNew.state = 'DISCONNECTED';
        await this.logStateChange(id, connectionInformationNew.state);
        await this.notifyState(new GrowbeMainboard({ id, connectionInformation: connectionInformationNew }), { connectionInformation: true });
        await this.growbeModuleService.onBoardDisconnect(id);

        if (this.cacheMainboard[id]) {
          this.cacheMainboard[mainboard.id].connectionInformation = connectionInformationNew;
        }
        
        delete this.watcherMainboard[id];
      })().then(
        () => {},
        () => {},
      );
    }, hearthBeathRate * 1000);
  }


  private async getMainboard(id: string): Promise<GrowbeMainboard> {
    if (!this.cacheMainboard[id]) {
     this.cacheMainboard[id] = await this.growbeService.findOrCreate(id, {
       include: ['growbeMainboardConfig','connectionInformation'],
     }) as any;
    }
    return this.cacheMainboard[id];
  }

  private logStateChange(mainboardId: string, state: string) {
    return this.logsService.addLog({
      growbeMainboardId: mainboardId,
      group: GroupEnum.MAINBOARD,
      severity: SeverityEnum.HIGH,
      type: LogTypeEnum.CONNECTION_STATE_CHANGE,
      message: `connected ${state}`,
    });
  }

  /**
   * notify a state change for a Growbe (CONNECTED and DISCONNECTED)
   * @param mainboard
   */
  private async notifyState(mainboard: GrowbeMainboard, modifs: {[id: string]: boolean}) {
    if (modifs.mainboard === true) {
      await this.growbeService.mainboardRepository.updateById(
        mainboard.id,
        mainboard,
      );
      await this.mqttService.send(
        getTopic(mainboard.id, '/cloud/state'),
        JSON.stringify(new GrowbeMainboard(mainboard)),
      );
    }
    if (modifs.connectionInformation === true) {
      await this.growbeService.connectionInformationRepo.update(mainboard.connectionInformation);
      await this.mqttService.send(
        getTopic(mainboard.id, '/cloud/connectionInformation'),
        JSON.stringify(new GrowbeMainboardConnectionInformation(mainboard.connectionInformation))
      );
    }
  }
}
