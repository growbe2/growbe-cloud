import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { LoopbackRestClient } from "@berlingoqc/ngx-loopback";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class GrowbeMainboardAPI extends LoopbackRestClient<any> {
  constructor(httpClient: HttpClient) {
    super(httpClient, '/growbes')
    console.log('ENV', envConfig);
    this.baseURL = envConfig.growbeCloud;
  }

}
