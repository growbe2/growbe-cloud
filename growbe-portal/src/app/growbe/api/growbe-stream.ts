import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { LoopbackRestClient } from '@berlingoqc/ngx-loopback';
// import { GrowbeStream } from "@growbe2/ngx-cloud-api";

@Injectable({ providedIn: 'root' })
export class GrowbeStreamAPI extends LoopbackRestClient<any> {
    constructor(httpClient: HttpClient) {
        super(httpClient, '/growbeStream');
        this.baseURL = envConfig.growbeCloud;
    }
}
