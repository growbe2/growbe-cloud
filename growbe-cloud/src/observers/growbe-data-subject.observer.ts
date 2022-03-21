import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  service,
} from '@loopback/core';
import mqtt from 'mqtt';
import { Subscription } from 'rxjs';

import {GrowbeMainboardBindings} from '../keys';
import { MqttListnener } from '../services/mqtt-listener.service';
import { DataSubject } from './data-subject.model';


@lifeCycleObserver('')
export class GrowbeDataSubjectObserver implements LifeCycleObserver {
  client: mqtt.Client;

  subs: Subscription[] = [];

  constructor(
    @inject(GrowbeMainboardBindings.WATCHERS) public watchers: DataSubject[],
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @service(MqttListnener) private mqttListener: MqttListnener,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    return this.mqttListener.init().then();
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    for(const watcher of this.watchers) {
      this.subs.push(this.mqttListener.addWatcher(watcher));
    }
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
