import { HearthBeath, ModuleStatus } from '@growbe2/growbe-pb';
import {
  Component,
  LifeCycleObserver,
  CoreBindings,
  inject,
  Binding,
} from '@loopback/core';
import { GrowbeMainboardBindings } from '../keys';
import { GrowbeModuleService, GrowbeStateService } from '../services';
import { GrowbeDataSubjectObserver } from './observers';
import { DataSubject, funcModuleSubject } from './observers/model';

const watchers: DataSubject[] = [
  {
    func: (id, service: GrowbeStateService, data: any) => {
      return service.onBeath(id, data)
    },
    model: HearthBeath,
    regexTopic: 'heartbeath',
    service: GrowbeStateService,
  },
  {
    func: funcModuleSubject((id, moduleId, service: GrowbeModuleService, data: any) => service.onModuleDataChange(id,moduleId,data)),
    model: null,
    regexTopic: 'data',
    service: GrowbeModuleService,
  },
  {
    func: funcModuleSubject((id, moduleId, service: GrowbeModuleService, data: any) => service.onModuleStateChange(id, moduleId, data)),
    model: ModuleStatus,
    regexTopic: 'state',
    service: GrowbeModuleService,
  }
];

export class WatcherComponent implements Component {
  constructor() {
    console.log('WATCH COMPONENT STARTING');
  }
  controllers = [];
  bindings = [
    Binding.bind(GrowbeMainboardBindings.WATCHERS).to(watchers)
  ];
  lifeCycleObservers = [GrowbeDataSubjectObserver];
}