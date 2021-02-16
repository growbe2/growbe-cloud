import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

import {AsyncClient, connectAsync} from 'async-mqtt';
import { envConfig } from "@berlingoqc/ngx-common";
import { filter, map } from "rxjs/operators";


export const getTopic = (growbeId: string, subtopic: string) => {
  return `/growbe/${growbeId}${subtopic}`;
}


@Injectable({providedIn: 'root'})
export class GrowbeEventService {

  registerTopic = {};

  client: AsyncClient;


  subject: Subject<any> = new Subject();


  private connectPromise: Promise<AsyncClient>;

  async connect() {
    console.log('CONNET');
    this.connectPromise = connectAsync(envConfig.broker);
    this.client = await this.connectPromise;
    this.client.on('message', (topic, message) => {
        this.subject.next({topic, message});
    });
  }

  async addSubscription(topic: string) {
    return this.client.subscribe(topic);
  }


  getGrowbeEvent(id: string, subtopic: string, parse: (data) => any) {
    const topic = getTopic(id, subtopic);
    if(!this.registerTopic[topic]) {
      this.addSubscription(topic).then(() => console.log('Register to', topic)).catch(() => console.warn("Failed to subscript to ", topic))
      this.registerTopic[topic] = true;
    }
    return this.subject.asObservable()
      .pipe(filter((value) => value.topic === topic))
      .pipe(map((value) => {
        try {
          return parse(value.message)
        } catch(err) {
          return null;
        }
      }))
  }


  async send(topic: string, body: any) {
    this.client.publish(topic, body);
  }


}
