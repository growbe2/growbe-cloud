import {
  Application,
  CoreBindings,
  inject,
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver,
  service, // The interface
} from '@loopback/core';
import { filter } from 'rxjs/operators';
import mqtt from 'mqtt';
import { MQTTService } from '../../services';

import { HearthBeath } from '@growbe2/growbe-pb';
import { GrowbeStateService } from '../../services/growbe-state.service';

/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class GrowbeDataSubjectObserver implements LifeCycleObserver {
  client: mqtt.Client;
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @service(MQTTService) private mqttService: MQTTService,
    @service(GrowbeStateService) private growbeStateService: GrowbeStateService,
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
    await this.mqttService.connect();
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    await this.mqttService.addSubscription('#');
    this.mqttService.observable.pipe(filter(x => x.topic.includes("heartbeath"))).subscribe((data) => {
      const beath = HearthBeath.decode(data.message);
      this.growbeStateService.onBeath(this.getIdFromTopic(data.topic), beath);
    });
   
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }

  private getIdFromTopic(topic: string): string {
    // TODO Remplacer par une regex
    return topic.split('/')[2];
  }
}
