import {
  Application,
  CoreBindings,
  inject,
  lifeCycleObserver,
  LifeCycleObserver,
  service,
} from '@loopback/core';
import mqtt from 'mqtt';
import {filter} from 'rxjs/operators';
import {GrowbeMainboardBindings} from '../../keys';
import {MQTTService} from '../../services';
import {DataSubject} from './model';

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
    for (const subject of this.watchers) {
      // TODO mettre vrai regex calsis
      this.mqttService.observable
        .pipe(
          filter(
            x =>
              !x.topic.includes('cloud') &&
              x.topic.includes(subject.regexTopic),
          ),
        )
        .subscribe(data => {
          (async () => {
            try {
              const d = subject.model
                ? subject.model.decode(data.message)
                : data.message;
              const serviceSubject = await this.app.get(
                `services.${subject.service.name}`,
              );
              await subject.func(
                this.getIdFromTopic(data.topic),
                serviceSubject,
                d,
                data.topic,
              );
            } catch (err) {
              console.log('Failed to parse on subject', data.topic, err);
            }
          })()
            .then(() => {})
            .catch(() => {});
        });
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
