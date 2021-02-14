import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import {AsyncClient, connectAsync} from 'async-mqtt';
import { envConfig } from "@berlingoqc/ngx-common";
import { filter, map } from "rxjs/operators";


export const getTopic = (growbeId: string, subtopic: string) => {
  return `/growbe/${growbeId}${subtopic}`;
}


@Injectable({providedIn: 'root'})
export class GrowbeEventService {

  client: AsyncClient;

  observable: Observable<{topic: string; message: Buffer}>;


  private connectPromise: Promise<AsyncClient>;

  async connect() {
    this.connectPromise = connectAsync(envConfig.broker);
    this.client = await this.connectPromise;
    this.observable = new Observable((sub) => {
      this.client.on('message', (topic, message) => {
        sub.next({topic, message});
      });
    })
  }

  async addSubscription(topic: string) {
    return this.client.subscribe(topic);
  }


  async getGrowbeEvent(id: string, subtopic: string, parse: (data) => any) {
    const topic = getTopic(id, subtopic);
    this.addSubscription(topic).then(() => console.log('Register to', topic)).catch(() => console.warn("Failed to subscript to ", topic))
    return this.observable
      .pipe(filter((value) => value.topic === topic))
      .pipe(map((value) => parse(value.message)))
  }


  async send(topic: string, body: any) {
    this.client.publish(topic, body);
  }


}
