import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';

import { AsyncClient, connectAsync } from 'async-mqtt';
import { envConfig } from '@berlingoqc/ngx-common';
import { filter, finalize, map, startWith, switchMap } from 'rxjs/operators';

import { exec } from 'mqtt-pattern';
import {GrowbeMainboardAPI} from '../api/growbe-mainboard';
import {GrowbeModuleAPI} from '../api/growbe-module';

export const getTopic = (growbeId: string, subtopic: string) =>
    `/growbe/${growbeId}${subtopic}`;

@Injectable({ providedIn: 'root' })
export class GrowbeEventService {
    client: AsyncClient;

    subject: Subject<any> = new Subject();


    subscription: {[topic: string]: number} = {};
    listeningMainboard: {[id: string]: () => void} = {};
    private connectPromise: Promise<AsyncClient>;

    constructor(
      private mainboardAPI: GrowbeMainboardAPI,
      private moduleAPI: GrowbeModuleAPI,
    ) {}

    async connect() {
        if (this.client) { return; }
        this.connectPromise = connectAsync(envConfig.broker);
        this.client = await this.connectPromise;
        this.client.on('message', (topic, message) => {
            this.subject.next({ topic, message });
        });
    }

    async addSubscription(topic: string) {
        if (!this.subscription[topic]) {
          this.subscription[topic] = 1;
          //console.log('Subscription to', topic);
          return this.client.subscribe(topic);
        }
    }

    async removeSubscriptipon(topic: string) {
        if (this.subscription[topic]) {
          this.subscription[topic] -= 1;
          if (this.subscription[topic] <= 0) {
              //console.log('Unsubscribing to', topic);
              delete this.subscription[topic];
              return this.client.unsubscribe(topic);
          }
        }
    }


    startListenMainboard(id: string) {

      (async () => {

        await this.connect();

      let replaceValue = (requests, value, id, callback = undefined) => {
            if (!callback) {
              callback = () => value;
            }
            return Object.values(requests).forEach((ctx: any) => {
              if (ctx.context == id) {
                  ctx.subject.next({
                    operation: 'callback',
                    id: value.id,
                    callback,
                  });
              }
            });
      };

      if (!this.listeningMainboard[id]) {
          let parse = (d) => Object.assign(JSON.parse(d), { createdAt: new Date()});
          let subscriptionMainboardState = this.getGrowbeEvent(id, `/cloud/state`, parse).subscribe((value) => {
            replaceValue(this.mainboardAPI.requestFind.items, value, value.id, (oldValue) => {
              oldValue.state = value.state;
              oldValue.lastUpdatedAt = value.lastUpdatedAt;
              return oldValue;
            });
          });

          let subscriptionConnectionInformation = this.getGrowbeEvent(id, `/cloud/connectionInformation`, parse).subscribe(value => {
            replaceValue(this.mainboardAPI.requestFind.items, value, value.growbeMainboardId, (oldValue) => {
              oldValue.connectionInformation = value;
              return oldValue;
            });
          });

          let subscriptionModuleState = this.getGrowbeEvent(id, `/cloud/m/+/state`, parse).subscribe((value) => {
            replaceValue(this.moduleAPI.requestFind.items, value.id, value);
          });

          let subscriptionModuleConfig = this.getGrowbeEventWithTopicData(id, `/cloud/m/+/config`, parse).subscribe(({message, topic}) => {
            const items = topic.split('/');
            const id = items[items.length - 2];
            replaceValue(this.moduleAPI.requestFind.items, message, id, (oldValue) => {
                oldValue.config = message;
                return oldValue;
            });
          });

          this.listeningMainboard[id] = () => {
              subscriptionModuleState.unsubscribe();
              subscriptionMainboardState.unsubscribe();
              subscriptionModuleConfig.unsubscribe();
              subscriptionConnectionInformation.unsubscribe();
          };
      }
      })();

    }

    stopListenningMainboard(id: string) {
      if (this.listeningMainboard[id]) {
        this.listeningMainboard[id]();
        delete this.listeningMainboard[id];
      }
    }

    getGrowbeEvent(id: string, subtopic: string, parse: (data) => any) {
        const topic = getTopic(id, subtopic);
        this.addSubscription(topic).then(() => {});
        return this.subject
            .asObservable()
            .pipe(filter((value) => exec(topic, value.topic)))
            .pipe(
                map((value) => {
                    try {
                        return parse(value.message);
                    } catch (err) {
                        return null;
                    }
                }),
                finalize(() => {
                  this.removeSubscriptipon(topic).then(() => {});
                })
            );
    }

    getGrowbeEventWithTopicData(id: string, subtopic: string, parse: (data) => any) {
        const topic = getTopic(id, subtopic);
        this.addSubscription(topic).then(() => {});
        return this.subject
            .asObservable()
            .pipe(filter((value) => exec(topic, value.topic)))
            .pipe(
                map((value) => {
                    try {
                        return { message: parse(value.message), topic: value.topic };
                    } catch (err) {
                        return null;
                    }
                }),
                finalize(() => {
                  this.removeSubscriptipon(topic).then(() => {});
                })
            );
    }



    liveUpdateFromGrowbeEvent<T>(
        id: string,
        topic: string,
        parse?: (data: any)  => T,
    ): (obs: Observable<any>) => Observable<T> {
        return (obs) => {
            return obs.pipe(
                switchMap((value: any) => {
                    return this.getGrowbeEvent(
                        id,
                        topic,
                        parse ? parse : JSON.parse
                    ).pipe(startWith(value))
                })
            )
        }
    }

    getGrowbeEventWithSource<T>(
        id: string,
        subtopic: string,
        parse: (data: any) => T,
        obs: Observable<T[]>,
        filter?: (data: T) => boolean,
    ): Observable<T[]> {
        return new Observable<T[]>((sub) => {
            let data: T[] = [];
            let subSource = obs.subscribe((firstData) => {
                if (sub.closed) { subEvent.unsubscribe(); subSource.unsubscribe(); return; }
                data = firstData;
                sub.next(data);
            });
            let subEvent = this.getGrowbeEvent(id, subtopic, parse).subscribe((newData) => {
                if (sub.closed) { subEvent.unsubscribe(); subSource.unsubscribe(); return; }
                if (!filter || filter(newData)) {
                  data.unshift(newData);
                  data.splice(data.length - 1, 1);
                  sub.next(data);
                }
            });
        });
    }

    async send(topic: string, body: any) {
        this.client.publish(topic, body);
    }
}
