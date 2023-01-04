import { Injectable } from '@angular/core';
import {ArrayProperty, AutoFormData, FormObject, IProperty} from '@berlingoqc/ngx-autoform';
import {NotificationService, notify} from '@berlingoqc/ngx-notification';
import {GrowbeMainboardWithRelations} from '@growbe2/ngx-cloud-api';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {GrowbeMainboardAPI} from '../api/growbe-mainboard';

@Injectable({
  providedIn: 'root'
})
export class GrowbeProcessConfigService {

  constructor(
    private growbeAPI: GrowbeMainboardAPI,
  ) { }

  getGrowbeProcessForm(mainboard: GrowbeMainboardWithRelations): AutoFormData {
        return {
          type: 'simple',
          items: [
            {
              name: 'comboards',
              type: 'array',
              elementType: {
                type: 'object',
                properties: [
                {
                  name: 'imple',
                  type: 'string'
                },
                {
                  name: 'config',
                  type: 'string',
                  required: false,
                } as IProperty,
                ]
              } as FormObject,
              templates: {
                header: 'Comboard configuration'
              },
            } as ArrayProperty,
            {
              name: 'mqtt',
              type: 'object',
              templates: {
                header: 'Cloud Server'
              },
              properties: [
                {
                  name: 'url',
                  type: 'string'
                },
                {
                  name: 'port',
                  type: 'number',
                },
              ]
            } as FormObject,
            {
              name: 'server',
              type: 'object',
              templates: {
                header: 'Server configuration'
              },
               properties: [
                {
                  name: 'addr',
                  type: 'string'
                },
                {
                  name: 'port',
                  type: 'number',
                },
              ]
            } as FormObject,
            {
              name: 'logger',
              type: 'object',
              templates: {
                header: 'Logger configuration'
              },
              properties: [
                {
                  name: 'target',
                  type: 'string'
                },
              ]
            } as FormObject,
            {
              name: 'update',
              type: 'object',
              templates: {
                header: 'Update configuration'
              },
              properties: [
                {
                  name: 'autoupdate',
                  displayName: "Receive update automaticaly",
                  type: 'bool',
                  component: {
                    name: 'checkbox'
                  }
                },
                {
                  name: 'channel',
                  type: 'string',
                  component: {
                    name: 'select',
                    type: 'mat',
                    transformValue: (e) => e,
                    options: {
                      displayContent: (e) => e,
                      value: of(["dev", "prod"])
                    }
                  }
                },
                {
                  name: 'reboot',
                  type: 'bool',
                  displayName: "Reboot automaticaly on update",
                  component: {
                    name: 'checkbox'
                  }
                }
              ]
            } as FormObject,
            {
              name: 'api',
              type: 'object',
              templates: {
                header: 'Cloud API Instance'
              },
              properties: [
                {
                  name: 'url',
                  type: 'string'
                }
              ],
            } as FormObject,
            {
              name: 'proxy',
              type: 'object',
              templates: {
                header: 'Reverse Proxy'
              },
              properties: [
                {
                  name: 'url',
                  type: 'string'
                }
              ],
            } as FormObject

          ],
          event: {
            submit: (data: any) => this.growbeAPI.updateProcessConfg(mainboard.id, data, (mainboard.growbeMainboardConfig?.config as any).preferedCommandConnection == 1).pipe(
              notify({
                title: 'Process configuration sended',
                body: () => 'Your mainboard as rebooted with your new configuration',
              }),
              tap(() => {
                this.growbeAPI.requestFind.items = {};
              })
            ),
            initialData: of((mainboard.growbeMainboardConfig as any).processConfig).pipe(map((x: any) => {
              // TODO: fix lib so that required is fine,
              for (let c of x.comboards) {
                if (!c.config) { c.config = ''; }
              }

              return x
            })),
          }
        };
  }
}
