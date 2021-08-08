import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { Caching, LoopbackRestClientMixin } from '@berlingoqc/ngx-loopback';
import { GrowbeModuleDefWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GrowbeModuleDefAPI  {
    baseURL: string;
    constructor(private httpClient: HttpClient) {
        this.baseURL = envConfig.growbeCloud;
    }


    addAlarm(mainboardId: string, alarmField: any) {
      return this.httpClient.post<void>(`${this.baseURL}/growbes/${mainboardId}/alarm/hardware`, alarmField).pipe(
        // TODO devrait mieux targeter

      );
    }

    removeAlarm(mainboardId: string, alarmField: any) {
      return this.httpClient.post<void>(`${this.baseURL}/growbes/${mainboardId}/alarm/hardware/rm`, alarmField).pipe(
        // TODO devrait mieux targeter

      );
    }
}


export function getModuleDefPropName(moduleDef: any, prop: any) {
  return moduleDef.properties[prop.name].displayName
                            ? moduleDef.properties[prop.name].displayName
                            : moduleDef.properties[prop.name].name;
}
