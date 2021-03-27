import {HearthBeath, ModuleData} from '@growbe2/growbe-pb';
import {Binding, Component} from '@loopback/core';
import { Subject } from 'rxjs';
import {GrowbeMainboardBindings} from '../keys';
import {GrowbeModuleService, GrowbeStateService} from '../services';
import { GrowbeLogsService } from '../services/growbe-logs.service';
import {GrowbeDataSubjectObserver, GrowbeStateWatcherObserver} from './observers';
import {DataSubject, funcModuleSubject} from './observers/model';

const watchers: DataSubject[] = [
  {
    func: (id, service: GrowbeStateService, data: any) => {
      return service.onBeath(id, data);
    },
    model: HearthBeath,
    regexTopic: 'heartbeath',
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
  constructor() {
  }
  controllers = [];
  bindings = [
    Binding.bind(GrowbeMainboardBindings.WATCHERS).to(watchers),
    Binding.bind(GrowbeMainboardBindings.WATCHER_STATE_EVENT).to(new Subject()),
  ];
  lifeCycleObservers = [GrowbeDataSubjectObserver, GrowbeStateWatcherObserver];
}
