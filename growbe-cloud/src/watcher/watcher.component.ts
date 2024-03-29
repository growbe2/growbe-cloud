import {ActionResponse, FieldAlarmEvent, HearthBeath, HelloWord, LocalConnection, ModuleData, UpdateExecute, SOILCalibrationStepEvent, VirtualRelayState, VirtualRelayData, MainboardConfig, EnvironmentControllerEvent } from '@growbe2/growbe-pb';
import {Binding, Component, CoreBindings, inject, service} from '@loopback/core';
import { ApplicationWithRepositories } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { split } from 'lodash';
import { DeviceLogsComponent, DeviceLogsController } from '../component/device-logs';
import {GrowbeMainboardBindings} from '../keys';
import { GroupEnum, LogTypeEnum, SeverityEnum } from '../models';
import { DataSubject, funcModuleSubject } from '../observers/data-subject.model';
import {EnvironmentControllerService, GrowbeActionReponseService, GrowbeHardwareAlarmService, GrowbeLogsService, GrowbeModuleService, GrowbeService, GrowbeStateService, VirtualRelayEventService} from '../services';
import { GrowbeCalibrationService } from '../services/growbe-calibration.service';
import {
  GrowbeStateWatcherObserver,
} from './observers';

const watchers: DataSubject[] = [
  {
    func: funcModuleSubject((id, moduleId, service: GrowbeModuleService, data: any) => {
      return service.receivedConfigFromMainboard(moduleId, data);
    }),
    model: null,
    regexTopic: 'config_updated',
    service: GrowbeModuleService,
  },
  {
    func: (id, service: GrowbeStateService) => {
      return service.onBeath(id);
    },
    model: HearthBeath,
    regexTopic: 'heartbeath',
    service: GrowbeStateService,
  },
  {
    func: (id, service: GrowbeStateService, hello: any) =>
      service.onHelloWorld(id, hello),
    model: HelloWord,
    regexTopic: 'hello',
    service: GrowbeStateService,
  },
  {
    func: (id, service: GrowbeService, localConnection: any) =>
      service.updateLocalConnection(id, localConnection),
    model: LocalConnection,
    regexTopic: 'localconnection',
    service: GrowbeService,
  },
  {
    func: (id, service: GrowbeService, processConfig: any) => service.updateProcessConfig(id, processConfig),
    model: MainboardConfig,
    regexTopic: 'config_process',
    service: GrowbeService,
  },
  {
    func: funcModuleSubject(
      (id, moduleId, service: GrowbeModuleService, data: any) =>
        service.onModuleDataChange(id, moduleId, data),
    ),
    model: null,
    regexTopic: 'data',
    service: GrowbeModuleService,
  },
  {
    func: funcModuleSubject(
      (id, moduleId, service: GrowbeModuleService, data: any) =>
        service.onModuleStateChange(id, moduleId, data),
    ),
    model: ModuleData,
    regexTopic: 'state',
    service: GrowbeModuleService,
  },
  {
    func: (id: string, service: VirtualRelayEventService, data: any) => service.onVirtualRelayState(id, data),
    model: VirtualRelayState,
    regexTopic: 'vrstate',
    service: VirtualRelayEventService,
  },
  {
    func: (id: string, service: VirtualRelayEventService, data: any, topic: string) => {
      const splits = topic.split('/');
      const vrId = splits[splits.length - 2];
      return service.onVirtualRelayData(id, vrId, data);
    },
    model: VirtualRelayData,
    regexTopic: 'vrdata',
    service: VirtualRelayEventService,
  },
  {
    func: funcModuleSubject(
      (id, moduleId, service: GrowbeHardwareAlarmService, data: any) => service.onHardwareAlarm(id,data)
    ),
    model: FieldAlarmEvent,
    regexTopic: 'alarm',
    service: GrowbeHardwareAlarmService,
  },
  {
    func: (id, service: GrowbeActionReponseService, action: any) => {
      return service.receiveActionResponse(id, action);
    },
    model: ActionResponse,
    regexTopic: 'response',
    service: GrowbeActionReponseService,
  },
  {
    func: (id, service: GrowbeLogsService, data: UpdateExecute) => {
      return service.addLog({
        growbeMainboardId: id,
        group: GroupEnum.MAINBOARD,
        severity: SeverityEnum.MEDIUM,
        type: LogTypeEnum.VERSION_UPDATED,
        newState: data,
        message: `updated execute for version ${data.version} ${(!data.restarted) ? 'process not restarted , update will be effective on next restart': ''}`
      });
    },
    model: UpdateExecute,
    regexTopic: 'update_executed',
    service: GrowbeLogsService,
  },
  {
    func: (id, service: GrowbeLogsService, data: any) => {
      return service.addLog({
        growbeMainboardId: id,
        group: GroupEnum.MAINBOARD,
        severity: SeverityEnum.MEDIUM,
        type: LogTypeEnum.RESTART,
        message: `restarting process`
      });
    },
    model: null,
    regexTopic: 'restarted',
    service: GrowbeLogsService,
  },
  {
    func: funcModuleSubject((id, moduleId, service: GrowbeCalibrationService, data: SOILCalibrationStepEvent) => {
      return service.onCalibrationEvent(id, moduleId, data)
    }),
    model: SOILCalibrationStepEvent,
    regexTopic: 'calibrationEvent',
    service: GrowbeCalibrationService,
  },
  {
    func: (id, service: EnvironmentControllerService, data: any) => {
      return service.onEvent(id, data);
    },
    model: EnvironmentControllerEvent,
    regexTopic: 'env_ctr',
    service: EnvironmentControllerService
  },
  {
    func: (id, service: GrowbeStateService, data: any) => {
      return service.onGrowbeDisconnectEvent(id);
    },
    model: null,
    regexTopic: 'disconnecting',
    service: GrowbeStateService,
  }
];

export class WatcherComponent implements Component {
  controllers = [];
  bindings = [Binding.bind(GrowbeMainboardBindings.WATCHERS).to(watchers)];
  lifeCycleObservers = [GrowbeStateWatcherObserver];

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE)
    app: RestApplication & ApplicationWithRepositories,
  ) {

    app.component(DeviceLogsComponent);
  }
}
