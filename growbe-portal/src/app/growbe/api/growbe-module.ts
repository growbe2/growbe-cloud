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
    GrowbeModuleWithRelations, GrowbeSensorValue, GrowbeSensorValueWithRelations,
} from '@growbe2/ngx-cloud-api';

@Injectable({ providedIn: 'root' })
export class GrowbeModuleAPI extends Resolving(
    LoopbackRestClientMixin<GrowbeModuleWithRelations>(),
) {

    growbeSensorValues = addLoopbackRelation(
      this,
      LoopbackRelationClientMixin<GrowbeSensorValueWithRelations>(),
      'growbeSensorValues'
    );

    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeModules');
        this.baseURL = envConfig.growbeCloud;
    }
}
