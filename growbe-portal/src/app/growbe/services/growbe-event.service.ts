import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';

import { AsyncClient, connectAsync } from 'async-mqtt';
import { envConfig } from '@berlingoqc/ngx-common';
import { filter, finalize, map, startWith, switchMap } from 'rxjs/operators';

import { exec } from 'mqtt-pattern';
import { GrowbeMainboardAPI } from '../api/growbe-mainboard';
import { GrowbeMainboard, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { GrowbeModuleAPI } from '../api/growbe-module';
import { GrowbeGraphService } from '../module/graph/service/growbe-graph.service';

export const getTopic = (growbeId: string, subtopic: string) =>
    `/growbe/${growbeId}${subtopic}`;

@Injectable({ providedIn: 'root' })
export class GrowbeEventService {
    client: AsyncClient;

    subject: Subject<any> = new Subject();


    subscription: {[topic: string]: number} = {};

    private connectPromise: Promise<AsyncClient>;


    constructor(
      private growbeAPI: GrowbeMainboardAPI,
      private growbeModuleAPI: GrowbeModuleAPI,
      private graphService: GrowbeGraphService,
    ) {

    }

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
          console.log('Subscription to', topic);
          return this.client.subscribe(topic);
        }
    }

    async removeSubscriptipon(topic: string) {
        if (this.subscription[topic]) {
          this.subscription[topic] -= 1;
          if (this.subscription[topic] <= 0) {
              console.log('Unsubscribing to', topic);
              delete this.subscription[topic];
              return this.client.unsubscribe(topic);
          }
        }
    }


    getGrowbeLive(id: string): Observable<GrowbeMainboard> {
      return this.growbeAPI.getById(id).pipe(
        this.liveUpdateFromGrowbeEvent(id, `/cloud/state`)
      );
    }

    getModuleLive(id: string, moduleId: string): Observable<GrowbeModule> {
      return this.growbeModuleAPI.getById(moduleId).pipe(
        this.liveUpdateFromGrowbeEvent(id, `/cloud/m/${moduleId}/state`)
      )
    }

    getModuleDataLive(id: string, moduleId: string, properties: string[]): Observable<any> {
      return this.graphService.getGraph(id, 'one', {
        moduleId,
        growbeId: id,
        fields: properties,
        liveUpdate: true,
      }).pipe(
        map((v) => v[0]),
        this.liveUpdateFromGrowbeEvent(id, `/cloud/m/${moduleId}/data`, (d) => Object.assign(JSON.parse(d), { createdAt: new Date()})),
      )
    }


    // GENERIC FUNCTION

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
