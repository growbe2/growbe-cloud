import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
//import { GrowbeStream } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeStreamAPI {
    constructor(private httpClient: HttpClient) {}

    getLivetream(growbeId: string): Observable<any[]> {
        return this.httpClient.get<any[]>(
            `${envConfig.growbeCloud}/growbeStream/${growbeId}/live`,
        );
    }

    createLiveStream(
        growbeMainboardId: string,
        streamName: string,
    ): Observable<any> {
        return this.httpClient.post<any>(
            `${envConfig.growbeCloud}/growbeStream`,
            {
                growbeMainboardId,
                streamName,
            },
        );
    }

    deleteLiveStream(streamId: string): Observable<void> {
        return this.httpClient.delete<void>(
            `${envConfig.growbeCloud}/growbeStreams/${streamId}`
        );
    }
}
