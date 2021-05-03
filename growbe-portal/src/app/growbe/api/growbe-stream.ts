import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { GrowbeStream } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeStreamAPI {
    constructor(private httpClient: HttpClient) {}

    getLiveStreams(growbeId: string): Observable<GrowbeStream[]> {
        return this.httpClient.get<GrowbeStream[]>(
            `${envConfig.growbeCloud}/growbeStreams/${growbeId}/live`,
        );
    }

    createLiveStream(
        growbeMainboardId: string,
        streamName: string,
    ): Observable<GrowbeStream> {
        return this.httpClient.post<GrowbeStream>(
            `${envConfig.growbeCloud}/growbeStreams`,
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
