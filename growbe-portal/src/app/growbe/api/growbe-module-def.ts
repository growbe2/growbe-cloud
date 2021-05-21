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

    override(data: {moduleId: string, moduleName: string}): Observable<void> {
      return this.httpClient.post<void>(`${this.url}/override`, data);
    }

}
