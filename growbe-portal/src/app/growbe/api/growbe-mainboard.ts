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
    EnvironmentControllerStateWithRelations,
} from '@growbe2/ngx-cloud-api';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';


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


export class HardwareAlarmRelation extends LoopbackRelationClientMixin<any>() {
    moduleId: string;

    get url(): string {
      return `${super.url}/${this.moduleId}/alarm/hardware`;
    }

}


export const DEFAULT_RELATIONS = [{relation: "growbeMainboardConfig"}, {relation: "connectionInformation"}];

@Injectable({ providedIn: 'root' })
export class GrowbeMainboardAPI extends Caching(
    Resolving(LoopbackRestClientMixin<GrowbeMainboardWithRelations>()),
) {
    growbeWarnings = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeWarningWithRelations>(),
        'growbeWarnings',
        {}
    );
    growbeModules = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeModuleWithRelations>(),
        'growbeModules',
        {}
    );
    growbeSensorValues = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeSensorValueWithRelations>(),
        'growbeSensorValues',
        {}
    );
    growbeLogs = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<GrowbeLogsWithRelations>(),
        'growbeLogs',
        {}
    );

    deviceLogs = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<any>(),
        'deviceLogs',
        {}
    );

    environmentControllers = addLoopbackRelation(
        this,
        LoopbackRelationClientMixin<EnvironmentControllerStateWithRelations>(),
        'environmentControllerStates',
        {}
    );

    hardwareAlarms = addLoopbackRelation(
      this,
      HardwareAlarmRelation,
      'modules',
      {}
    )

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


    private features: {name: string}[] = [];

    get url() {
      if (!envConfig) {
        throw new Error('failed hwere');
      }
      return envConfig?.growbeCloud + '/growbes';
    }

    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbes');

    }

    loadCloudFeature() {
        this.getFeatures().subscribe((features) => this.features = features);
    }

    hasFeature(name: string) {
        return this.features.findIndex(x => x.name === name) > -1;
    }

    register(id: string) {
      return this.httpClient.post<GrowbeRegisterResponse>(`${envConfig.growbeCloud}/growbe/register`, {id})
    }

    registerOrganisation(id: string, orgId: string) {
      return this.httpClient.post<GrowbeRegisterResponse>(`${envConfig.growbeCloud}/growbe/${id}/register/org/${orgId}`, {})
    }


    virtualRelayUpdateConfig(growbeId: string, vrId: string, config: any, direct?: boolean) {
      return this.httpClient.patch<void>(`${envConfig.growbeCloud}/growbes/${growbeId}/virtualRelays/${vrId}/config?direct=${direct || false}`, config);
    }

    updateProcessConfg(mainboadId: string, processConfig: any, direct?: boolean): Observable<void> {
      return this.httpClient.patch<void>(`${envConfig.growbeCloud}/growbe/${mainboadId}/processconfig?direct=${false || false}`, processConfig).pipe(
        tap(() => {
          this.requestFind.onModif(of(null))
        })
      )
    }

    updateCloudConfig(mainboardId: string, cloudConfig: any): Observable<void> {
      return this.httpClient.patch<void>(`${envConfig.growbeCloud}/growbe/${mainboardId}/config?direct=${cloudConfig.preferedCommandConnnection === 1}`, cloudConfig).pipe(
        tap(() => {
          this.requestFind.onModif(of(null))
        })
      )
    }

    getFeatures(): Observable<{name: string}[]> {
      return of([]);
    }
}
