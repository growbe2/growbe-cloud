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
    CachingRelation,
} from '@berlingoqc/ngx-loopback';
import {
    GrowbeMainboardWithRelations,
    GrowbeWarningWithRelations,
    GrowbeModuleWithRelations,
    GrowbeSensorValueWithRelations,
    GrowbeLogsWithRelations,
    GrowbeRegisterResponse,
    GrowbeMainboard,
    VirtualRelayWithRelations,
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

class VirtualRelayRelation extends CachingRelation(LoopbackRelationClientMixin<VirtualRelayWithRelations>()) {}

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
    )
    virtualRelays = addLoopbackRelation(
      this,
      VirtualRelayRelation,
      '/virtualRelays',
      {
        customPath: {
          delete: '/del'
        }
      }
    )

    userGrowbeMainboard = addCustomCRUDDatasource<GrowbeMainboard>(
      this,
      '/user',
    );

    get url() {
      return envConfig?.growbeCloud + '/growbes';
    }

    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbes');
    }

    register(id: string) {
      return this.httpClient.post<GrowbeRegisterResponse>(`${envConfig.growbeCloud}/growbe/register`, {id})
    }

    registerOrganisation(id: string, orgId: string) {
      return this.httpClient.post<GrowbeRegisterResponse>(`${envConfig.growbeCloud}/growbe/${id}/register/org/${orgId}`, {})
    }


    virtualRelayUpdateConfig(growbeId: string, vrId: string, config: any) {
      return this.httpClient.patch<void>(`${envConfig.growbeCloud}/growbes/${growbeId}/virtualRelays/${vrId}/config`, config);
    }
}
