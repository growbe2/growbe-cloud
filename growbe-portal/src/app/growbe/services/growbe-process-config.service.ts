import { Injectable } from '@angular/core';
import {MatSidenavContainer} from '@angular/material/sidenav';
import {AutoFormData, FormObject} from '@berlingoqc/ngx-autoform';
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
              name: 'comboard',
              type: 'object',
              templates: {
                header: 'Comboard configuration'
              },
              properties: [
                {
                  name: 'imple',
                  type: 'string'
                },
                {
                  name: 'config',
                  type: 'string',
                },
              ]
            } as FormObject,
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
          ],
          event: {
            submit: (data: any) => this.growbeAPI.updateProcessConfg(mainboard.id, data).pipe(
              notify({
                title: 'Process configuration sended',
                body: () => 'Your mainboard as rebooted with your new configuration',
              }),
              tap(() => {
                this.growbeAPI.requestFind.items = {};
              })
            ),
            initialData: of((mainboard.growbeMainboardConfig as any).processConfig),
          }
        };
  }
}
