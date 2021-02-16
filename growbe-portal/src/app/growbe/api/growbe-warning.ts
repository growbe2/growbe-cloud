import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { LoopbackRestClient } from "@berlingoqc/ngx-loopback";

@Injectable({providedIn: 'root'})
export class GrowbeWarningAPI extends LoopbackRestClient<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/warnings')
    this.baseURL = envConfig.growbeCloud;
  }

}
