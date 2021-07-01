import {BindingScope, inject, injectable} from '@loopback/core';
import mqtt from 'async-mqtt';
import {Observable} from 'rxjs';
import {MQTTBindings} from '../keys';

export const getTopic = (growbeId: string, subtopic: string) => {
  return `/growbe/${growbeId}${subtopic}`;
};

@injectable({scope: BindingScope.SINGLETON})
export class MQTTService {
  private client: mqtt.AsyncClient;

  observable: Observable<{topic: string; message: Buffer}>;

  constructor(
    @inject(MQTTBindings.URL)
    private url: string,
  ) {}

  async connect() {
    this.client = await mqtt.connectAsync(this.url);
    this.observable = new Observable(sub => {
      this.client.on('message', (topic, message) => {
        sub.next({topic, message});
      });
    });
  }

  async addSubscription(topic: string) {
    return this.client.subscribe(topic);
  }

  async send(topic: string, body: any, options?: any) {
    return this.client.publish(topic, body, options);
  }
}
