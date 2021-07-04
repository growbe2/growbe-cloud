import {HearthBeath, HelloWord, ModuleData } from '@growbe2/growbe-pb';
import {Binding, Component} from '@loopback/core';
import {GrowbeMainboardBindings} from '../keys';
import { DataSubject, funcModuleSubject } from '../observers/data-subject.model';
import {GrowbeActionReponseService, GrowbeModuleService, GrowbeStateService} from '../services';
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
];

export class WatcherComponent implements Component {
  constructor() {}
  controllers = [];
  bindings = [Binding.bind(GrowbeMainboardBindings.WATCHERS).to(watchers)];
  lifeCycleObservers = [GrowbeStateWatcherObserver];
}
