import { Injector } from '@angular/core';
import { AutoFormData, SelectComponent } from '@berlingoqc/ngx-autoform';
import { envConfig } from '@berlingoqc/ngx-common';
import { of } from 'rxjs';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { GrowbeStreamAPI } from 'src/app/growbe/api/growbe-stream';
import { PreventParentScrollDirective } from 'src/app/helpers/prevent-parent-scroll.directive';

export const getPhoneStreamingConfig: (
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
    injector: Injector,
) => AutoFormData = (
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
    injector: Injector,
) => {
    const streamService = injector.get(GrowbeStreamAPI);
    return {
        type: 'simple',
        items: [
            {
                type: 'object',
                name: 'object',
                decorators: {
                    style: {
                        overflow: 'auto',
                    },
                    custom: [
                        {
                            type: PreventParentScrollDirective,
                            resolver: (e) => [e],
                        },
                    ],
                },
                properties: [
                    {
                        type: 'bool',
                        name: 'activated',
                        component: {
                            name: 'checkbox',
                        },
                    },
                    {
                        type: 'string',
                        name: 'url',
                        component: {
                          name: 'select',
                          type: 'mat',
                          transformValue: (e) => `${envConfig.nms.replace('https', 'rtmp')}/live/${e.streamName}${e.url}`,
                          options: {
                            displayContent: (e) => e.streamName,
                            value: () => streamService.getLiveStreams(mainboardId)
                          },
                          compareWith: (a, b) => a === b
                        } as SelectComponent,
                    },
                    {
                        type: 'string',
                        name: 'output',
                        component: {
                          name: 'select',
                          type: 'mat',
                          transformValue: (e) => e.toString(),
                          options: {
                            displayContent: (e) => ['Stream', 'Record', 'Stream & Record'][e],
                            value: () => of([0,1,2]),
                          },
                        }
                    },
                    {
                        type: 'string',
                        name: 'camera',
                        component: {
                          name: 'select',
                          type: 'mat',
                          transformValue: (e) => e.toString(),
                          options: {
                            displayContent: (e) => ['Back', 'Front'][e],
                            value: () => of([0,1]),
                          },
                        }
                    },
                    {
                        type: 'bool',
                        name: 'light',
                        component: {
                            name: 'checkbox',
                        },
                        value: false,
                    },
                    {
                        type: 'bool',
                        name: 'audio',
                        component: {
                            name: 'checkbox',
                        },
                        value: true,
                    },
                    {
                        type: 'bool',
                        name: 'autoFocus',
                        component: {
                            name: 'checkbox',
                        },
                        value: false,
                    },
                    {
                        type: 'bool',
                        name: 'stabilization',
                        component: {
                            name: 'checkbox',
                        },
                        value: false,
                    },
                    {
                        type: 'bool',
                        name: 'faceDetection',
                        component: {
                            name: 'checkbox',
                        },
                        value: false,
                    },
                ],
            },
        ],
        event: {
          submit: (data) => {
            const d = data.object;
            console.log(d);
            return growbeActionAPI.executeActionModule('GROWBE_CONFIG_UPDATE', mainboardId, moduleId, d);
          },
          initialData: () => of({object: config})
        }
    };
};
