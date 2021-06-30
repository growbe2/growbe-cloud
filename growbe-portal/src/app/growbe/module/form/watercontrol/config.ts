import {
    AutoFormData,
    FormObject,
    FormProperty,
    UnionProperty,
} from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { timeFieldComponent } from 'src/app/shared/timeframe/timeframe-select/timeframe-select.component';

const transformFieldSubmit = (property: string, data: any) => ({
    mode: data.object[property].config.type === 'manual' ? 0 : 1,
    [data.object[property].config.type]:
        data.object[property].config.type === 'manual'
            ? data.object[property].config.data
            : {
                  begining: {
                      hour: +data.object[property].config.data.begining.split(
                          ':',
                      )[0],
                      minute: +data.object[property].config.data.begining.split(
                          ':',
                      )[1],
                  },
                  end: {
                      hour: +data.object[property].config.data.end.split(
                          ':',
                      )[0],
                      minute: +data.object[property].config.data.end.split(
                          ':',
                      )[1],
                  },
              },
});

const transformFieldInit = (property: string, config: any) => ({
    config: {
        type: config?.[property]?.mode === 1 ? 'alarm' : 'manual',
        data:
            config?.[property]?.mode === 1
                ? {
                      begining:
                          config?.[property].alarm?.begining?.hour +
                          ':' +
                          config?.[property].alarm?.begining?.minute,
                      end:
                          config?.[property].alarm?.end?.hour +
                          ':' +
                          config?.[property].alarm?.end?.minute,
                  }
                : config?.[property]?.manual
    },
});

export const getModuleWaterControlConfig: (
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeModuleAPI: GrowbeModuleAPI,
) => AutoFormData = (
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeModuleAPI: GrowbeModuleAPI,
) => ({
    type: 'simple',
    items: [
        {
            type: 'object',
            name: 'object',
            properties: [
                ...['p0', 'p1', 'p2', 'drain', 'pump0', 'pump1', 'pump2', 'pump3'].map(
                    (itext) =>
                        ({
                            type: 'object',
                            templates: {
                                header: moduleDef.properties[itext].displayName
                                    ? moduleDef.properties[itext].displayName
                                    : itext,
                            },
                            name: itext,
                            properties: [
                                {
                                    type: 'union',
                                    name: 'config',
                                    types: {
                                        manual: {
                                            name: 'manual',
                                            type: 'object',
                                            properties: [
                                                {
                                                    type: 'bool',
                                                    name: 'state',
                                                    component: {
                                                        name: 'checkbox',
                                                    },
                                                },
                                            ],
                                        },
                                        alarm: {
                                            name: 'alarm',
                                            type: 'object',
                                            properties: [
                                                {
                                                    type: 'string',
                                                    name: 'begining',
                                                    displayName: 'Opening time',
                                                    component: timeFieldComponent,
                                                },
                                                {
                                                    type: 'string',
                                                    name: 'end',
                                                    displayName: 'Closing time',
                                                    component: timeFieldComponent,
                                                },
                                            ],
                                        },
                                    },
                                } as UnionProperty,
                            ],
                        } as FormObject),
                ),
            ],
        },
    ],
    event: {
        submit: (data) => {
            console.log('DATA', data);
            const d = {
                p0: transformFieldSubmit('p0', data),
                p1: transformFieldSubmit('p1', data),
                p2: transformFieldSubmit('p2', data),
                drain: transformFieldSubmit('drain', data),
                pump0: transformFieldSubmit('pump0', data),
                pump1: transformFieldSubmit('pump1', data),
                pump2: transformFieldSubmit('pump2', data),
                pump3: transformFieldSubmit('pump3', data),
            };
            return growbeModuleAPI.updateModuleConfig(moduleId, d);
        },
        initialData: () =>
            of({
                object: {
                    p0: transformFieldInit('p0', config),
                    p1: transformFieldInit('p1', config),
                    p2: transformFieldInit('p2', config),
                    drain: transformFieldInit('drain', config),
                    pump0: transformFieldInit('pump0', config),
                    pump1: transformFieldInit('pump1', config),
                    pump2: transformFieldInit('pump2', config),
                    pump3: transformFieldInit('pump3', config),
                },
            }),
    },
});
