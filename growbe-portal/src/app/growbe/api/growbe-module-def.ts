import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
@Injectable({ providedIn: 'root' })
export class GrowbeModuleDefAPI  {
    get baseURL(): string {
      return envConfig.growbeCloud;
    }

    constructor(private httpClient: HttpClient) {}

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
