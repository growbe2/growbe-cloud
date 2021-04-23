import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { Caching, LoopbackRelationClient, LoopbackRelationClientMixin, addLoopbackRelation, LoopbackRelationAccessor, LoopbackRestClientMixin, Resolving, Filter } from '@berlingoqc/ngx-loopback';
import { GrowbeMainboardWithRelations, GrowbeWarningWithRelations, GrowbeModuleWithRelations, GrowbeSensorValue, GrowbeSensorValueWithRelations, GrowbeLogsWithRelations } from '@growbe2/ngx-cloud-api';

@Injectable({providedIn: 'root'})
export class GrowbeMainboardAPI extends Caching(Resolving(LoopbackRestClientMixin<GrowbeMainboardWithRelations>())) {
  growbeWarnings = addLoopbackRelation(this, LoopbackRelationClientMixin<GrowbeWarningWithRelations>(), 'growbeWarnings');
  growbeModules = addLoopbackRelation(this, LoopbackRelationClientMixin<GrowbeModuleWithRelations>(), 'growbeModules');
  growbeSensorValues = addLoopbackRelation(this, LoopbackRelationClientMixin<GrowbeSensorValueWithRelations>(), 'growbeSensorValues');
  growbeLogs = addLoopbackRelation(this, LoopbackRelationClientMixin<GrowbeLogsWithRelations>(), 'growbeLogs');

  constructor(httpClient: HttpClient) {
    super(httpClient, '/growbes');
    this.baseURL = envConfig.growbeCloud;
  }
}
