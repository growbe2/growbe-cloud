import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import {
    Caching,
    LoopbackRelationClient,
    LoopbackRelationClientMixin,
    addLoopbackRelation,
    LoopbackRelationAccessor,
    LoopbackRestClientMixin,
    Resolving,
    Filter,
} from '@berlingoqc/ngx-loopback';
import {
    GrowbeModuleWithRelations,
    GrowbeSensorValue,
    GrowbeSensorValueWithRelations,
} from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeModuleAPI extends Caching(
    Resolving(LoopbackRestClientMixin<GrowbeModuleWithRelations>()),
) {
    growbeSensorValues = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeSensorValueWithRelations>(),
        'growbeSensorValues',
    );

    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeModules');
        this.baseURL = envConfig.growbeCloud;
    }

    updateModuleConfig(id: string, config: any): Observable<any> {
        return this.httpClient.post<any>(`${this.url}/${id}/config`, config);
    }
}
