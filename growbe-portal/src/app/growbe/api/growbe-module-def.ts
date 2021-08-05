import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { Caching, LoopbackRestClientMixin } from '@berlingoqc/ngx-loopback';
import { GrowbeModuleDefWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GrowbeModuleDefAPI extends Caching(
    LoopbackRestClientMixin<GrowbeModuleDefWithRelations>(),
) {
    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbes');
        this.baseURL = envConfig.growbeCloud;
    }


    addAlarm(mainboardId: string, alarmField: any) {
      return this.httpClient.post<void>(`${this.url}/${mainboardId}/alarm/hardware`, alarmField).pipe(
        // TODO devrait mieux targeter
        tap(() => Object.values(this.requestFind.items).forEach((item) => {
            item.subject.next(null);
          }))
      );
    }

    removeAlarm(mainboardId: string, alarmField: any) {
      return this.httpClient.post<void>(`${this.url}/${mainboardId}/alarm/hardware/rm`, alarmField).pipe(
        // TODO devrait mieux targeter
        tap(() => Object.values(this.requestFind.items).forEach((item) => {
            item.subject.next(null);
          }))
      );
    }

    override(data: { moduleId: string; moduleName: string, growbeId: string }): Observable<void> {
        return this.httpClient.post<void>(`${this.url}/${data.growbeId}/override`, data);
    }
}


export function getModuleDefPropName(moduleDef: any, prop: any) {
  return moduleDef.properties[prop.name].displayName
                            ? moduleDef.properties[prop.name].displayName
                            : moduleDef.properties[prop.name].name;
}
