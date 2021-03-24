import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { envConfig } from "@berlingoqc/ngx-common";
import { Caching, LoopbackRestClient, LoopbackRelationClient } from "@berlingoqc/ngx-loopback";
import { GrowbeMainboardWithRelations } from "@growbe2/ngx-cloud-api";

class Client extends LoopbackRestClient<GrowbeMainboardWithRelations> {}

@Injectable({providedIn: 'root'})
export class GrowbeMainboardAPI extends Caching(Client) {
  growbeWarnings;
  growbeModules;
  growbeSensorValues;
  growbeLogs;

  constructor(httpClient: HttpClient) {
    super(httpClient, '/growbes')
    console.log('ENV', envConfig);
    this.baseURL = envConfig.growbeCloud;

    this.growbeWarnings = new LoopbackRelationClient(httpClient,'/growbes', 'growbeWarnings');
    this.growbeWarnings.baseURL = this.baseURL;
    this.growbeModules = new LoopbackRelationClient(httpClient,'/growbes', 'growbeModules');
    this.growbeModules.baseURL = this.baseURL;
    this.growbeSensorValues = new LoopbackRelationClient(httpClient,'/growbes', 'growbeSensorValues');
    this.growbeSensorValues.baseURL = this.baseURL;
    this.growbeLogs = new LoopbackRelationClient(httpClient,'/growbes', 'growbeLogs');
    this.growbeLogs.baseURL = this.baseURL;
  }

}
