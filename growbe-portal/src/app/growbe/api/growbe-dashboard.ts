import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { LoopbackRestClient } from "@berlingoqc/ngx-loopback";

@Injectable({providedIn: 'root'})
export class GrowbeDashboardAPI extends LoopbackRestClient<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/dashboards')
    this.baseURL = envConfig.growbeCloud;
  }

}
