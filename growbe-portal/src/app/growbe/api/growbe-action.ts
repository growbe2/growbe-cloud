import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionConfirmationDialogComponent, envConfig } from '@berlingoqc/ngx-common';
import { notify } from '@berlingoqc/ngx-notification';
import { GrowbeMainboard, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from './growbe-mainboard';
import { GrowbeModuleAPI } from './growbe-module';

@Injectable({ providedIn: 'root' })
export class GrowbeActionAPI {
    url: string;
    constructor(
      private httpClient: HttpClient,
      private growbeAPI: GrowbeMainboardAPI,
      private growbeModuleAPI: GrowbeModuleAPI,
    ) {
        this.url = envConfig.growbeCloud;
    }

    executeAction(
        action: string,
        growbeId: string,
        data: any,
    ): Observable<any> {
        return this.pipeValue(
          this.growbeAPI.getById(growbeId),
          (mainboard: GrowbeMainboard) => mainboard.state === 'CONNECTED',
          action,
          growbeId,
          null,
          data
        );
    }

    executeActionModule(
      action: string,
      mainboardId: string,
      moduleId: string,
      data: any
    ): Observable<any> {
      return this.pipeValue(
        this.growbeModuleAPI.getById(moduleId),
        (module: GrowbeModule) => module.connected,
        action,
        mainboardId,
        moduleId,
        data
      );
    }

    private pipeValue(obs: Observable<any>, condition: (ressource) => boolean, action, id, moduleId, data) {
      return obs.pipe(
        switchMap((ressource) => {
          if (condition(ressource)) {
            if (!moduleId)
              return this[action](id, data);
            else
              return this[action](id, moduleId, data);
          }
          return throwError(new Error('ressource is not connected.'));
        }),
        notify({
          title: 'Sucesss',
          titleFailed: 'Error',
          body: (data) => data.response.msg,
          bodyFailed: (error) => error,
        })
      )
    }

    RTC_OFFSET(growbeId: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/rtc`,
            data,
        );
    }

    GROWBE_CONFIG_UPDATE(growbeId: string, moduleId: string, data: any) {
      console.log(growbeId, moduleId, data);
        return this.httpClient.post<void>(
            `${this.url}/growbeModules/${moduleId}/config`,
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
