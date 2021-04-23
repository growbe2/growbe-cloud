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
    GrowbeMainboardWithRelations,
    GrowbeWarningWithRelations,
    GrowbeModuleWithRelations,
    GrowbeSensorValue,
    GrowbeSensorValueWithRelations,
    GrowbeLogsWithRelations,
} from '@growbe2/ngx-cloud-api';

@Injectable({ providedIn: 'root' })
export class GrowbeModuleAPI extends Resolving(
    LoopbackRestClientMixin<GrowbeModuleWithRelations>(),
) {
    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeModules');
        this.baseURL = envConfig.growbeCloud;
    }
}
