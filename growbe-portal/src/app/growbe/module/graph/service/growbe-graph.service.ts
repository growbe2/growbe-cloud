import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import {
  ArrayProperty,
    FormObject,
    IProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { envConfig } from '@berlingoqc/ngx-common';
import { GrowbeModuleDefWithRelations } from 'growbe-cloud-api/lib';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import {
    getModuleDefPropName,
    GrowbeModuleDefAPI,
} from 'src/app/growbe/api/growbe-module-def';

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

    getPropertySelectForm(moduleId$: Observable<string>, nbrProperty?: number): IProperty {
        return {
            type: 'array',
            name: 'fields',
            decorators: {
                //class: ['frow', 'half', 'evenly'],
            },
            min: nbrProperty,
            max: nbrProperty,
            elementType: {
              name: '',
              type: 'string',
              required: true,
              component: {
                name: 'select',
                transformValue: (e) => e.name,
                options: {
                  displayContent: (e) => e.displayName || e.name,
                  value: moduleId$.pipe(
                    filter((moduleId) => moduleId !== null),
                    switchMap((moduleId) => this.moduleAPI.moduleDef(moduleId).get()),
                    map((moduleDef) => Object.values(moduleDef.properties)),
                  )
                }
              } as SelectComponent
            },
        } as ArrayProperty;
    }

    getGraphTimeFrameSelectForm(moduleId$: Observable<string>, nbrProperty?: number): IProperty[] {
        return [
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
            this.getPropertySelectForm(moduleId$, nbrProperty),
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
        ];
    }
}
