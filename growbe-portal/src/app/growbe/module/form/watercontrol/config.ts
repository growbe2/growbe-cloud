import {
    AutoFormData,
    FormObject,
    FormProperty,
    UnionProperty,
} from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';

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
                ...['p0', 'p1', 'p2'].map(
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
                                                    name: 'hour',
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
            const d = {
                p0: {
                    mode: data.object.p0.config.type === 'manual' ? 0 : 1,
                    [data.object.p0.config.type]: data.object.p0.config.data,
                },
                p1: {
                    mode: data.object.p1.config.type === 'manual' ? 0 : 1,
                    [data.object.p1.config.type]: data.object.p1.config.data,
                },
                p2: {
                    mode: data.object.p2.config.type === 'manual' ? 0 : 1,
                    [data.object.p2.config.type]: data.object.p2.config.data,
                },
            };
            return growbeModuleAPI.updateModuleConfig(moduleId, d);
        },
        initialData: () =>
            of({
                object: {
                    p0: {
                        config: {
                            type: config?.p0.mode === 0 ? 'manual' : 'alarm',
                            data: config?.p0.manual,
                        },
                    },
                    p1: {
                        config: {
                            type: config?.p1.mode === 0 ? 'manual' : 'alarm',
                            data: config?.p1.manual,
                        },
                    },
                    p2: {
                        config: {
                            type: config?.p2.mode === 0 ? 'manual' : 'alarm',
                            data: config?.p2.manual,
                        },
                    },
                },
            }),
    },
});
