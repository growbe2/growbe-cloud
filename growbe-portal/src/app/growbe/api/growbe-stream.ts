import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { GrowbeStream } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeStreamAPI {
    constructor(private httpClient: HttpClient) {}

    getLivetream(growbeId: string): Observable<GrowbeStream[]> {
        return this.httpClient.get<any[]>(
            `${envConfig.growbeCloud}/growbeStream/${growbeId}/live`,
        );
    }

    createLiveStream(
        growbeMainboardId: string,
        streamName: string,
    ): Observable<GrowbeStream> {
        return this.httpClient.post<GrowbeStream>(
            `${envConfig.growbeCloud}/growbeStream`,
            {
                growbeMainboardId,
                streamName,
            },
        );
    }
}
