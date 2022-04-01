import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionConfirmationDialogComponent, envConfig } from '@berlingoqc/ngx-common';
import { NotificationD, notify, NotifyConfig } from '@berlingoqc/ngx-notification';
import { GrowbeMainboard, GrowbeModule } from '@growbe2/ngx-cloud-api';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from './growbe-mainboard';
import { GrowbeModuleAPI } from './growbe-module';

@Injectable({ providedIn: 'root' })
export class GrowbeActionAPI {
    get url(): string {
      return envConfig.growbeCloud;
    }
    constructor(
      private httpClient: HttpClient,
      private growbeAPI: GrowbeMainboardAPI,
      private growbeModuleAPI: GrowbeModuleAPI,
    ) {}

    executeAction(
        action: string,
        growbeId: string,
        data: any,
        notification: Partial<NotifyConfig> = {},
    ): Observable<any> {
        return this.pipeValue(
          this.growbeAPI.getById(growbeId),
          (mainboard: GrowbeMainboard) => mainboard.state === 'CONNECTED',
          action,
          growbeId,
          null,
          data,
          notification,
        );
    }

    executeActionModule(
      action: string,
      mainboardId: string,
      moduleId: string,
      data: any,
      notification: Partial<NotifyConfig> = {},
    ): Observable<any> {
      return this.pipeValue(
        this.growbeModuleAPI.getById(moduleId),
        (module: GrowbeModule) => module.connected,
        action,
        mainboardId,
        moduleId,
        data,
        notification,
      );
    }

    private pipeValue(obs: Observable<any>, condition: (ressource) => boolean, action, id, moduleId, data, notification: Partial<NotifyConfig>) {
      return obs.pipe(
        take(1),
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
          body: (data) => data.response?.msg,
          bodyFailed: (error) => {
            console.log('ERORRO', error.error);
            let inner_message = error.error?.message;
            if (inner_message) {
              return inner_message.msg;
            }
            return 'Unknown error , sorry ....'
          },
          ...notification,
        } as any)
      )
    }

    RTC_OFFSET(growbeId: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/rtc`,
            data,
        );
    }

    GROWBE_CONFIG_PROPERTY_UPDATE(growbeId: string, moduleId: string, data: any) {
      return this.httpClient.post<void>(
        `${this.url}/growbeModules/${moduleId}/config/${data.property}`,
        data.config
      ).pipe(tap(() => {
        this.growbeModuleAPI.requestFind.onModif(of(null)).subscribe();
      }))
    }

    GROWBE_CONFIG_UPDATE(growbeId: string, moduleId: string, data: any) {
        return this.httpClient.post<void>(
            `${this.url}/growbeModules/${moduleId}/config`,
            data,
        ).pipe(tap(() => {
          this.growbeModuleAPI.requestFind.onModif(of(null)).subscribe();
        }))
    }

    DESYNC(growbeId: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/sync`,
            data,
        );
    }

    LOCAL_CONNECTION(growbeId: string, data: any) {
      return this.sendRequest(growbeId, "localconnection", data);
    }

    HELLO_WORLD(growbeId: string, data: any) {
      return this.sendRequest(growbeId, "helloworld", data);
    }

    RESTART(growbeId: string, data: any) {
      return this.sendRequest(growbeId, "restart", data);
    }

    REBOOT(growbeId: string, data: any) {
      return this.sendRequest(growbeId, "reboot", data);
    }

    private sendRequest(growbeId: string, pathName: string, data: any) {
        return this.httpClient.patch<void>(
            `${this.url}/growbe/${growbeId}/${pathName}`,
            data,
        );
    }
}
