import {ActionResponse, FieldAlarmEvent, HearthBeath, HelloWord, LocalConnection, ModuleData } from '@growbe2/growbe-pb';
import {Binding, Component} from '@loopback/core';
import {GrowbeMainboardBindings} from '../keys';
import { DataSubject, funcModuleSubject } from '../observers/data-subject.model';
import {GrowbeActionReponseService, GrowbeHardwareAlarmService, GrowbeModuleService, GrowbeService, GrowbeStateService} from '../services';
import {
  GrowbeStateWatcherObserver,
} from './observers';

const watchers: DataSubject[] = [
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
  }
];

export class WatcherComponent implements Component {
  constructor() {}
  controllers = [];
  bindings = [Binding.bind(GrowbeMainboardBindings.WATCHERS).to(watchers)];
  lifeCycleObservers = [GrowbeStateWatcherObserver];
}
