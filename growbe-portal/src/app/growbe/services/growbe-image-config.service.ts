import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AutoFormData, FormObject, SelectComponent} from '@berlingoqc/ngx-autoform';
import {envConfig} from '@berlingoqc/ngx-common';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GrowbeImageConfigService {

  constructor(
    private httpClient: HttpClient,
  ) { }


  generateImageConfig(mainboardId: string, config: any): Observable<void> {
    return this.httpClient.post<void>(`${envConfig.growbeCloud}/growbe/${mainboardId}/image/configuration`, config);
  }

  getImageConfigArchiveLink(mainboardId: string): string {
    return `${envConfig.growbeCloud}/containers/${mainboardId}/download/image-config.zip`;
  }

  downloadConfigArchive(mainboardId: string): Observable<any> {
    return this.httpClient.get(this.getImageConfigArchiveLink(mainboardId), {responseType: 'blob'})
  }

  getGrowbeImageConfigForm(mainboardId: string): AutoFormData {
    return {
      type: 'simple',
      items: [
        {
          type: 'string',
          name: 'environment',
          component: {
            name: 'select',
            options: {
              displayContent: (e) => e,
              value: of(["dev", "prod"])
            }
          } as SelectComponent
        },
        {
          type: 'bool',
          name: 'ssh',
          component: {
            name: 'checkbox'
          },
          displayName: "Allowed access for diagnostic and support"
        },
        {
          type: 'bool',
          name: 'fluentLog',
          component: {
            name: 'checkbox'
          },
          displayName: "Allowed to send log and metrics from device"
        },
        {
          type: 'object',
          name: 'wifi',
          templates: {
            header: "Wifi Configuration"
          },
          properties: [
            {
              type: 'string',
              name: 'ssid'
            },
            {
              type: 'string',
              name: 'password'
            },
          ]
        } as FormObject
      ],
      event: {
        submit: (data: any) => {
          const config = {
            environment: data.environment,
            fluentLog: {
              enable: data.fluentLog
            },
            ssh: {
              enable: data.ssh
            },
            wifi: { ...data.wifi, country: 'CA' }
          }
          return this.generateImageConfig(mainboardId, config);
        },
      },
      actionsButtons: {
        submit: {
          title: 'Generate',
          style: 'mat-flat-button',
          color: 'primary'
        },
        extra: [
          {
            title: 'Download zip configuration',
            style: 'mat-flat-button',
            color: 'accent',
            click: () => {
              return this.downloadConfigArchive(mainboardId).pipe(
                tap((response) => {
                  const a = document.createElement('a');
                  document.body.appendChild(a);
                  const url = window.URL.createObjectURL(response);
                  a.href = url;
                  a.download = `image-config-${mainboardId}.zip`; // you need to write the extension of file here
                  a.click();
                  window.URL.revokeObjectURL(url);
                })
              );
            }
          }
        ]
      }
    }
  }
}
