import { Injectable } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';

import { AsyncClient, connectAsync } from 'async-mqtt';
import { envConfig } from '@berlingoqc/ngx-common';
import { filter, map, startWith, switchMap } from 'rxjs/operators';

import { exec } from 'mqtt-pattern';
import { GrowbeMainboardAPI } from '../api/growbe-mainboard';
import { GrowbeMainboard, GrowbeModule } from 'growbe-cloud-api/lib';
import { GrowbeModuleAPI } from '../api/growbe-module';
import { GrowbeGraphService } from '../module/graph/service/growbe-graph.service';

export const getTopic = (growbeId: string, subtopic: string) =>
    `/growbe/${growbeId}${subtopic}`;

@Injectable({ providedIn: 'root' })
export class GrowbeEventService {
    registerTopic = {};

    client: AsyncClient;

    subject: Subject<any> = new Subject();

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
        return this.client.subscribe(topic);
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
        if (!this.registerTopic[topic]) {
            this.addSubscription(topic)
                .then(() => console.log('Register to', topic))
                .catch(() => console.warn('Failed to subscript to ', topic));
            this.registerTopic[topic] = true;
        }
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
        parse: (data) => T,
        obs: Observable<T[]>,
    ): Observable<T[]> {
        return new Observable<T[]>((sub) => {
            let data: T[] = [];
            this.getGrowbeEvent(id, subtopic, parse).subscribe((newData) => {
                data.unshift(newData);
                data.splice(data.length - 1, 1);
                sub.next(data);
            });
            obs.subscribe((firstData) => {
                data = firstData;
                sub.next(data);
            });
        });
    }

    async send(topic: string, body: any) {
        this.client.publish(topic, body);
    }
}
