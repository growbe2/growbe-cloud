import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import {
    Caching,
    LoopbackRestClientMixin,
    Resolving,
} from '@berlingoqc/ngx-loopback';
import { GrowbeDashboardWithRelations, GrowbeSensorValue } from '@growbe2/ngx-cloud-api';

@Injectable({ providedIn: 'root' })
export class GrowbeSensorValueAPI extends Caching(
    LoopbackRestClientMixin<GrowbeSensorValue>(),
) {
    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeSensorValues');
        this.baseURL = envConfig.growbeCloud;
    }
}
