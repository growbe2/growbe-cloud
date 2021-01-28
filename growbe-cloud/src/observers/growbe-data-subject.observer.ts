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
import { MQTTService } from '../services';

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
  ) {}

  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    this.mqttService.observable.pipe(filter(x => x.topic === 'presence')).subscribe((data) => {
      console.log(data);
    })
   
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
