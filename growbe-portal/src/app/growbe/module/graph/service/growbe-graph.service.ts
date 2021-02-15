import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";

@Injectable()
export class GrowbeGraphService {

  constructor(private httpClient: HttpClient) {}

  getGraph(data: any) {
    return this.httpClient.post(`${envConfig.growbeCloud}/growbe/graph`, data);
  }

}
