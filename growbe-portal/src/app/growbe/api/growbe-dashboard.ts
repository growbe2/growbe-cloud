import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { LoopbackRestClient } from "@berlingoqc/ngx-loopback";
import { GrowbeDashboardWithRelations } from "@growbe2/ngx-cloud-api";

@Injectable({providedIn: 'root'})
export class GrowbeDashboardAPI extends LoopbackRestClient<GrowbeDashboardWithRelations> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/dashboards')
    this.baseURL = envConfig.growbeCloud;
  }

}
