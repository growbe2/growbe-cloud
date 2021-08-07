import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';

@Injectable()
export class GrowbeGraphService {
    constructor(private httpClient: HttpClient) {}

    getGraph(growbeId: string, mode: string, data: any) {
        return this.httpClient.post(
            `${envConfig.growbeCloud}/growbes/${growbeId}/${mode}`,
            data,
        );
    }
}
