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

import { HearthBeath, THLModuleData } from '@growbe2/growbe-pb';
import { GrowbeStateService } from '../../services/growbe-state.service';
import { GrowbeModuleValueService } from '../../services/growbe-module-value.service';
import { Constructor } from '@loopback/repository';
import { GrowbeMainboardBindings } from '../../keys';
import { DataSubject } from './model';

@lifeCycleObserver('')
export class GrowbeDataSubjectObserver implements LifeCycleObserver {
  client: mqtt.Client;
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
    @service(MQTTService) private mqttService: MQTTService,
    @inject(GrowbeMainboardBindings.WATCHERS) private watchers: DataSubject[],
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
    for(const subject of this.watchers) {
      this.mqttService.observable.pipe(filter(x => x.topic.includes(subject.regexTopic))).subscribe(async (data) => {
        try {
        const d = subject.model.decode(data.message);
        const service = await this.app.get(`services.${subject.service.name}`);
        await subject.func(this.getIdFromTopic(data.topic), service, d);
        } catch(err) {
          console.log(err);
        }
      })
    }
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
