import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
@Injectable({ providedIn: 'root' })
export class GrowbeModuleDefAPI  {
    get baseURL(): string {
      return envConfig.growbeCloud;
    }

    constructor(private httpClient: HttpClient) {}
}


export function getModuleDefPropName(moduleDef: any, prop: any) {
  return moduleDef.properties[prop.name].displayName
                            ? moduleDef.properties[prop.name].displayName
                            : moduleDef.properties[prop.name].name;
}
