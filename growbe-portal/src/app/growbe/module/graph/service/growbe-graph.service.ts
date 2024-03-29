import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
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
import {GrowbeEventService} from 'src/app/growbe/services/growbe-event.service';


export const timeFieldComponent = {
    name: 'multipart',
    objects: {
        hours: {
            size: 2,
            type: 'number',
            validators: [
                (control: UntypedFormControl) => {
                    const hours = +control.value;
                    if (isNaN(hours) || hours > 23) {
                        return { hours: true };
                    }
                    return null;
                },
            ],
        },
        minutes: {
            size: 2,
            type: 'number',
            validators: [
                (control: UntypedFormControl) => {
                    const minutes = +control.value;
                    if (isNaN(minutes) || minutes > 59) {
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
};

@Injectable({
  providedIn: 'root'
})
export class GrowbeGraphService {
    constructor(
        private httpClient: HttpClient,
        private growbeEventService: GrowbeEventService,
        private moduleAPI: GrowbeModuleAPI,
    ) {}

    getGraph(growbeId: string, mode: string, data: any) {
        return this.httpClient.post(
            `${envConfig.growbeCloud}/growbes/${growbeId}/${mode}`,
            data,
        );
    }

    getModuleDataLive(id: string, moduleId: string, properties: string[]): Observable<any> {
      return this.getGraph(id, 'one', {
        moduleId,
        growbeId: id,
        fields: properties,
        liveUpdate: true,
      }).pipe(
        map((v) => v[0]),
        this.growbeEventService.liveUpdateFromGrowbeEvent(id, `/cloud/m/${moduleId}/data`, (d) => Object.assign(JSON.parse(d), { createdAt: new Date()})),
      )
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
                    map((moduleDef: any) => Object.values(moduleDef.properties)),
                  )
                }
              } as SelectComponent
            };
    }

    getPropertySelectForm(moduleId$: Observable<string>, name = 'fields', nbrProperty?: number): IProperty {
        return {
            type: 'array',
            name,
            displayName: 'Properties',
            decorators: {
                headers: 'Properties to add to graphs',
            },
            templates: {
                hint: 'List of propertie to display from the module',
            },
            min: nbrProperty,
            max: nbrProperty,
            elementType: this.getPropertySelectFormElement(moduleId$),
        } as ArrayProperty;
    }

    getGraphTimeFrameSelectForm(moduleId$: Observable<string>, nbrProperty?: number, optionalLastX?: boolean, extra?: IProperty[], grouping?: boolean): IProperty[] {
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
                    transformValue: (e) => e,
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
            this.getPropertySelectForm(moduleId$, 'fields', nbrProperty),
            ...( grouping ? [{
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
                    {
                        name: 'baseGroup',
                        type: 'array',
                        decorators: {
                            style: {
                                'display': 'none'
                            }
                        },
                        elementType: {
                            name: '',
                            type: 'string'
                        },
                    } as ArrayProperty
                ],
            } as FormObject]: []),
        ];
    }
}
