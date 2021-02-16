import { HearthBeath, THLModuleData } from '@growbe2/growbe-pb';
import {
  Component,
  LifeCycleObserver,
  CoreBindings,
  inject,
  Binding,
} from '@loopback/core';
import { GrowbeMainboardBindings } from '../keys';
import { GrowbeStateService } from '../services';
import { GrowbeModuleValueService } from '../services/growbe-module-value.service';
import { GrowbeDataSubjectObserver } from './observers';
import { DataSubject } from './observers/model';

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
    func: (id, service: GrowbeModuleValueService, data: any) => service.onModuleData(id,'thl',data),
    model: THLModuleData,
    regexTopic: 'thl',
    service: GrowbeModuleValueService,
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