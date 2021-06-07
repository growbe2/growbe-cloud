import {BindingScope, inject, injectable, service} from '@loopback/core';
import mqtt from 'async-mqtt';
import { map } from 'lodash';
import {from, Observable, of} from 'rxjs';
import { catchError, retryWhen, switchMap } from 'rxjs/operators';
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

  async send(topic: string, body: any) {
    return this.client.publish(topic, body);
  }

  async sendWithResponse(topic: string, body: any, options: WaitResponseOptions) {
    return from(this.send(topic, body))
      .pipe(
        switchMap(() => this.actionResponseService.waitForResponse(options))
      )
      .pipe(
        retryWhen(genericRetryStrategy({
          scalingDuration: 2000,
        })),
        catchError(error => of(error))
      )
  }
}
