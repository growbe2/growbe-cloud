import {
  Component,
  LifeCycleObserver,
  CoreBindings,
  inject,
} from '@loopback/core';
import { GrowbeDataSubjectObserver } from './observers';

export class WatcherComponent implements Component {
  constructor() {
    console.log('WATCH COMPONENT STARTING');
  }
  controllers = [];
  bindings = [];
  lifeCycleObservers = [GrowbeDataSubjectObserver];
}