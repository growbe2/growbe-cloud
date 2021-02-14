import {injectable,inject, BindingScope} from '@loopback/core';
import {Observable} from 'rxjs';
import { mqttObservable } from '../helpers';
import { MQTTBindings } from '../keys';
import mqtt from 'async-mqtt';

import {GrowbeMessage} from '@growbe2/growbe-pb';


export const getTopic = (growbeId: string, subtopic: string) => {
  return `/growbe/${growbeId}/board${subtopic}`;
}

@injectable({scope: BindingScope.SINGLETON})
export class MQTTService {

  private client: mqtt.AsyncClient;

  observable: Observable<{topic: string; message: Buffer}>;

  constructor(
      @inject(MQTTBindings.URL)
      private url: string
  ) {
  }

  async connect() {
    this.client = await mqtt.connectAsync(this.url);
    this.observable = new Observable((sub) => {
      this.client.on('message', (topic, message) => {
        sub.next({topic, message});
      });
    })
  }

  async addSubscription(topic: string) {
    return this.client.subscribe(topic);
  }


  async send(topic: string, body: any) {
    return this.client.publish(topic, body);
  }



}
