import {BindingScope, inject, injectable, service} from '@loopback/core';
import mqtt from 'async-mqtt';
import {from, Observable, of, defer} from 'rxjs';
import { catchError, finalize, retry, retryWhen, switchMap, take } from 'rxjs/operators';
import {MQTTBindings} from '../keys';
import { genericRetryStrategy, GrowbeActionReponseService, WaitResponseOptions } from './growbe-response.service';

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
    @service(GrowbeActionReponseService)
    private actionResponseService: GrowbeActionReponseService,
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

  sendWithResponse(mainboardId: string, topic: string, body: any, options: WaitResponseOptions) {
    const subReponse = `${topic}/response`;
    this.addSubscription(subReponse);
    return defer(() => this.send(topic, body, { qos: 2 }))
      .pipe(
        switchMap(() => {
          return this.actionResponseService.waitForResponse(mainboardId, options)
        }),
        take(1),
        retry(3),
        finalize(() => {
          this.client.unsubscribe(subReponse);
        })
      )
  }
}
