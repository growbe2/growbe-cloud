import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { LoopbackRestClient } from "@berlingoqc/ngx-loopback";
import { GrowbeWarningWithRelations } from "@growbe2/ngx-cloud-api";

@Injectable({providedIn: 'root'})
export class GrowbeWarningAPI extends LoopbackRestClient<GrowbeWarningWithRelations> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/warnings')
    this.baseURL = envConfig.growbeCloud;
  }

}
