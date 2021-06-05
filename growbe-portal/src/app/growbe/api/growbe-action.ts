import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envConfig } from '@berlingoqc/ngx-common';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GrowbeActionAPI {
    url: string;
    constructor(private httpClient: HttpClient) {
        this.url = envConfig.growbeCloud;
    }

    executeAction(
        action: string,
        growbeId: string,
        data: any,
    ): Observable<any> {
        return this[action](growbeId, data);
    }

    RTC_OFFSET(growbeId: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/rtc`,
            data,
        );
    }

    GROWBE_CONFIG_UPDATE(growbeId: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/config`,
            data,
        );
    }

    SYNC_REQUEST(growbeId: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/sync`,
            data,
        );
    }
}
