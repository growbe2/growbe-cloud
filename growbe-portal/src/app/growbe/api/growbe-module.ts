import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import {
    Caching,
    LoopbackRelationClient,
    LoopbackRelationClientMixin,
    addLoopbackRelation,
    LoopbackHaveOneRelationClient,
    LoopbackHasOneRelationClientMixin,
    LoopbackRestClientMixin,
    Resolving,
    Filter,
} from '@berlingoqc/ngx-loopback';
import {
    GrowbeModuleWithRelations,
    GrowbeSensorValue,
    GrowbeModuleDefWithRelations,
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

    moduleDef = addLoopbackRelation<
      String,
      GrowbeModuleWithRelations,
      GrowbeModuleDefWithRelations,
      LoopbackHaveOneRelationClient<GrowbeModuleDefWithRelations>
    >(
      this,
      LoopbackHasOneRelationClientMixin<GrowbeModuleDefWithRelations>(),
      'moduleDef'
    );


    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeModules');
        this.baseURL = envConfig.growbeCloud;
    }

    updateModuleConfig(boardId: string, id: string, config: any): Observable<any> {
        return this.httpClient.post<any>(`${this.baseURL}/growbes/${boardId}/modules/${id}/config`, config);
    }
}
