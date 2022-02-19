import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  ArrayProperty,
    FormObject,
    IProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { envConfig } from '@berlingoqc/ngx-common';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap} from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';


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

@Injectable({
  providedIn: 'root'
})
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

    getPropertySelectFormElement(moduleId$: Observable<string>, name = '') {
      return {
              name,
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
            };
    }

    getPropertySelectForm(moduleId$: Observable<string>, name = 'fields', nbrProperty?: number): IProperty {
        return {
            type: 'array',
            name,
            decorators: {
                headers: 'Properties to add to graphs'
            },
            min: nbrProperty,
            max: nbrProperty,
            elementType: this.getPropertySelectFormElement(moduleId$),
        } as ArrayProperty;
    }

    getGraphTimeFrameSelectForm(moduleId$: Observable<string>, nbrProperty?: number, optionalLastX?: boolean, extra?: IProperty[]): IProperty[] {
        return [
            {
                name: 'lastX',
                displayName: 'Last X unit',
                type: 'number',
                required: !optionalLastX,
            },
            {
                name: 'lastXUnit',
                type: 'string',
                displayName: 'Unit',
                required: !optionalLastX,
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
                displayName: 'Update the chart with live data',
                component: {
                    name: 'checkbox',
                },
            },
            ...(extra || []),
            {
                name: 't',
                type: 'object',
                templates: {
                    header: 'Properties for the graphs',
                },
                properties: [],
            } as FormObject,
            this.getPropertySelectForm(moduleId$, 'fields', nbrProperty),
            {
                name: 'grouping',
                type: 'object',
                templates: {
                    header: 'Averaging on interval'
                },
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
