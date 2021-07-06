import { FormGroup } from '@angular/forms';
import {
    AutoFormData,
    FormObject,
    FormProperty,
    UnionProperty,
} from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
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
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
) => AutoFormData = (
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
) => {
  let formGroup: FormGroup;
  return {
    type: 'simple',
    items: [
        {
            type: 'object',
            name: 'object',
            decorators: {
              style: {
                'max-height': '400px',
                'overflow': 'auto'
              }
            },
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
                                            decorators: {
                                              class: []
                                            },
                                            properties: [
                                                {
                                                    type: 'bool',
                                                    name: 'state',
                                                    component: {
                                                        name: 'checkbox',
                                                    },
                                                },
                                                {
                                                    type: 'number',
                                                    name: 'duration',
                                                }
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
        afterFormCreated: (fG: FormGroup) => {
          formGroup = fG;
        },
        submit: (data) => {
            const controls = (formGroup.controls.object as FormGroup).controls;
            const d = {
                p0: controls.p0.touched ? transformFieldSubmit('p0', data): undefined,
                p1: controls.p1.touched ? transformFieldSubmit('p1', data): undefined,
                p2: controls.p2.touched ? transformFieldSubmit('p2', data): undefined,
                drain: controls.drain.touched ? transformFieldSubmit('drain', data): undefined,
                pump0: controls.pump0.touched ? transformFieldSubmit('pump0', data): undefined,
                pump1: controls.pump1.touched ? transformFieldSubmit('pump1', data): undefined,
                pump2: controls.pump2.touched ? transformFieldSubmit('pump2', data): undefined,
                pump3: controls.pump3.touched ? transformFieldSubmit('pump3', data): undefined,
            };
            return growbeActionAPI.executeActionModule('GROWBE_CONFIG_UPDATE', mainboardId, moduleId, d);
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
}
};
