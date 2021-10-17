import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
//import { GrowbeStream } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeStreamAPI {

    get url(): string {
      return envConfig.growbeCloud + '/growbeStreams';
    }

    constructor(private httpClient: HttpClient) {}

    getLiveStreams(growbeId: string): Observable<any[]> {
        return this.httpClient.get<any[]>(`${this.url}/${growbeId}/live`);
    }

    createLiveStream(
        growbeMainboardId: string,
        streamName: string,
    ): Observable<any> {
        return this.httpClient.post<any>(`${this.url}`, {
            growbeMainboardId,
            streamName,
        });
    }

    deleteLiveStream(streamId: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.url}/${streamId}`);
    }
}
