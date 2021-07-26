import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { Caching, LoopbackRestClientMixin } from '@berlingoqc/ngx-loopback';
import { GrowbeModuleDefWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeModuleDefAPI extends Caching(
    LoopbackRestClientMixin<GrowbeModuleDefWithRelations>(),
) {
    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeModuleDefs');
        this.baseURL = envConfig.growbeCloud;
    }


    addAlarm(mainboardId: string, alarmField: any) {
      return this.httpClient.post<void>(`${this.url}/${mainboardId}/addAlarm`, alarmField);
    }

    removeAlarm(mainboardId: string, alarmField: any) {
      return this.httpClient.delete<void>(`${this.url}/${mainboardId}/removeAlarm`, alarmField);
    }

    override(data: { moduleId: string; moduleName: string }): Observable<void> {
        return this.httpClient.post<void>(`${this.url}/override`, data);
    }
}


export function getModuleDefPropName(moduleDef: any, prop: any) {
  return moduleDef.properties[prop.name].displayName
                            ? moduleDef.properties[prop.name].displayName
                            : moduleDef.properties[prop.name].name;
}
