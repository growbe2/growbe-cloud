import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
    FormObject,
    IProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { envConfig } from '@berlingoqc/ngx-common';
import { GrowbeModuleDefWithRelations } from 'growbe-cloud-api/lib';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { getModuleDefPropName, GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';

export const timeFieldComponent = {
    name: 'multipart',
    objects: {
        hours: {
            size: 2,
            validators: [
                (control: FormControl) => {
                    const hours = +control.value;
                    if (hours > 23) {
                        return { hours: true };
                    }
                    return null;
                },
            ],
        },
        minutes: {
            size: 2,
            validators: [
                (control: FormControl) => {
                    const minutes = +control.value;
                    if (minutes > 59) {
                        return { minutes: true };
                    }
                    return null;
                },
            ],
        },
    },
    spacers: [
        {
            type: 'string',
            content: ':',
        },
    ],
    transformer: {
        reconstruct: (time: any) => {
            if (time) {
                return Object.values(time).join(':');
            }
            return '';
        },
        transform: (time: string) => {
            if (time) {
                const split = time.split(':');
                return {
                    hours: split[0],
                    minutes: split[1],
                };
            }
            return { hours: '', minutes: '' };
        },
    },
    //validators: [Validators.pattern('^[0-9]*$')],
};



@Injectable()
export class GrowbeGraphService {
    constructor(
      private httpClient: HttpClient,
      private moduleAPI: GrowbeModuleAPI,
    ) {}

    getGraph(growbeId: string, mode: string, data: any) {
        return this.httpClient.post(
            `${envConfig.growbeCloud}/growbes/${growbeId}/${mode}`,
            data,
        );
    }

    getPropertySelectForm(moduleId: string): Observable<IProperty[]> {
      return this.moduleAPI.moduleDef(moduleId).get().pipe(
        map((moduleDef: GrowbeModuleDefWithRelations) => ([
            {
              type: 'object',
              name: 'fields',
              decorators: {
                class: ['frow', 'half', 'evenly']
              },
              properties: Object.values(moduleDef.properties).map((prop) => ({
                name: prop.name, // getModuleDefPropName(moduleDef, prop),
                type: 'bool',
                displayName: getModuleDefPropName(moduleDef, prop),
                component: {
                  name: 'checkbox',
                }
              })),
            }  as FormObject,
        ]))
      );
    }

    getGraphTimeFrameSelectForm(moduleId: string): Observable<IProperty[]> {
        // lastX , lastXUnit , liveUpdate , property[], fields, grouping
        return this.getPropertySelectForm(moduleId).pipe(
          map(propertiesProperty => [
            {
                name: 'lastX',
                type: 'number',
                required: true,
            },
            {
                name: 'lastXUnit',
                type: 'string',
                required: true,
                component: {
                    name: 'select',
                    options: {
                        displayTitle: 'Unit',
                        displayContent: (e) => e,
                        value: of(['Month', 'Hours', 'Minutes', 'Date']),
                    },
                } as SelectComponent,
            },
            {
                name: 'liveUpdate',
                type: 'bool',
                displayName: 'live update ?',
                component: {
                    name: 'checkbox',
                },
            },
            ...propertiesProperty,
            {
                name: 'grouping',
                type: 'object',
                required: false,
                properties: [
                    {
                        name: 'intervalValue',
                        type: 'number',
                    },
                    {
                        name: 'intervalUnit',
                        type: 'string',
                        component: {
                            name: 'select',
                            type: 'mat',
                            transformValue: (e) => e.value,
                            options: {
                                displayContent: (e) => e.name,
                                value: () =>
                                    of([
                                        { name: 'Year', value: 'year' },
                                        { name: 'Month', value: 'month' },
                                        {
                                            name: 'Day of Year',
                                            value: 'dayOfYear',
                                        },
                                        { name: 'Hour', value: 'hour' },
                                        { name: 'Minute', value: 'minute' },
                                    ]),
                            },
                        } as SelectComponent,
                    },
                ],
            } as FormObject,
        ]));
    }
}
