import {BindingScope, inject, injectable, service} from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import mqtt from 'async-mqtt';
import {from, Observable, of, defer, timer, throwError} from 'rxjs';
import { catchError, finalize, mergeMap, retry, retryWhen, switchMap, take, timeout } from 'rxjs/operators';
import {MQTTBindings} from '../keys';
import { GrowbeActionReponseService, WaitResponseOptions } from './growbe-response.service';
import {GrowbeReverseProxyService} from './growbe-reverse-proxy.service';
import { repository } from '@loopback/repository';

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
    @service(GrowbeReverseProxyService)
    private reverseProxyService: GrowbeReverseProxyService,
  ) {}

  async connect() {
    this.client = await mqtt.connectAsync(this.url);
    this.client.setMaxListeners(100);
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

  sendWithResponse(mainboardId: string, topic: string, body: any, options: WaitResponseOptions, responseTopic?: string, direct?: boolean) {
    if (direct) {
      return this.reverseProxyService.sendWithResponse(mainboardId, topic, body, options, responseTopic);
    }
    const subReponse = !responseTopic ? `${topic}/response`: responseTopic;
    this.addSubscription(subReponse);
    return defer(() => this.send(topic, body, { qos: 2 }))
      .pipe(
        timeout(100),
        switchMap(() => {
          return this.actionResponseService.waitForResponse(mainboardId, options)
        }),
        take(1),
        retryWhen((attempts: Observable<any>) => {
          return attempts.pipe(
            mergeMap((error, i): any => {
              const retryAttempt = i + 1;
              if (retryAttempt > (options.retry ?? 3) || error.status >= 400) {
                return throwError(error)
              }
              return timer(1);
            })
          )
        }),
        catchError(err => { throw new HttpErrors[400](err) }),
        finalize(() => {
          this.client.unsubscribe(subReponse);
        })
      )
  }
}
