import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import {
    Caching,
    LoopbackRelationClientMixin,
    addLoopbackRelation,
    LoopbackRestClientMixin,
    Resolving,
    Filter,
    CRUDDataSource,
    AnyObject,
    Count,
    Where,
    LoopbackRestClient,
    toQueryParams,
} from '@berlingoqc/ngx-loopback';
import {
    GrowbeMainboardWithRelations,
    GrowbeWarningWithRelations,
    GrowbeModuleWithRelations,
    GrowbeSensorValueWithRelations,
    GrowbeLogsWithRelations,
    GrowbeRegisterResponse,
    GrowbeMainboard
} from '@growbe2/ngx-cloud-api';


export const addCustomCRUDDatasource = <T>(
    parent: LoopbackRestClient<any>,
    path: string,
) => {
  return (key) => new class D implements CRUDDataSource<T> {
      get url() {
        return `${parent.url}${path}/${key}`;
      }

      get(filter?: Filter<any>) {
        return parent.httpClient.get<T[]>(this.url + toQueryParams('filter', filter));
      }

      count(where?: Where<AnyObject>) {
        return parent.httpClient.get<Count>(`${this.url}/count` + toQueryParams('where', where))
      }
  }
}

@Injectable({ providedIn: 'root' })
export class GrowbeMainboardAPI extends Caching(
    Resolving(LoopbackRestClientMixin<GrowbeMainboardWithRelations>()),
) {
    growbeWarnings = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeWarningWithRelations>(),
        'growbeWarnings',
    );
    growbeModules = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeModuleWithRelations>(),
        'growbeModules',
    );
    growbeSensorValues = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeSensorValueWithRelations>(),
        'growbeSensorValues',
    );
    growbeLogs = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeLogsWithRelations>(),
        'growbeLogs',
    );

    orgGrowbeMainboard = addCustomCRUDDatasource<GrowbeMainboard>(
      this,
      '/organisations'
    );

    userGrowbeMainboard = addCustomCRUDDatasource<GrowbeMainboard>(
      this,
      '/user',
    );

    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbes');
        this.baseURL = envConfig.growbeCloud;
    }

    register(id: string) {
      return this.httpClient.post<GrowbeRegisterResponse>(`${this.baseURL}/growbe/register`, {id})
    }

    registerOrganisation(id: string, orgId: string) {
      return this.httpClient.post<GrowbeRegisterResponse>(`${this.baseURL}/growbe/${id}/register/org/${orgId}`, {})
    }
}
