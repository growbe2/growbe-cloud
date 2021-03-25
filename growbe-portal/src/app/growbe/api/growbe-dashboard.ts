import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { Caching, LoopbackRestClientMixin, Resolving } from "@berlingoqc/ngx-loopback";
import { GrowbeDashboardWithRelations } from "@growbe2/ngx-cloud-api";

@Injectable({providedIn: 'root'})
export class GrowbeDashboardAPI extends Resolving(LoopbackRestClientMixin<GrowbeDashboardWithRelations>()) {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/dashboards')
    this.baseURL = envConfig.growbeCloud;
  }
}
