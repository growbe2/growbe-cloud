import { UntypedFormGroup } from "@angular/forms";
import { AutoFormData, FormObject } from "@berlingoqc/ngx-autoform";
import { Button } from "@berlingoqc/ngx-common";
import { from, of } from "rxjs";
import { map } from "rxjs/operators";
import { GrowbeActionAPI } from "src/app/growbe/api/growbe-action";
import { PreventParentScrollDirective } from "src/app/helpers/prevent-parent-scroll.directive";


export const getSoilConfigForm: (
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
        let formGroup: UntypedFormGroup;
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
                        },
                        custom: [
                            {
                                type: PreventParentScrollDirective,
                                resolver: (e) => [e],
                            }
                        ]
                    },
                    properties: [
                        ...['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'].map(prop => {
                            return {
                                type: 'object',
                                name: prop,
                                templates: {
                                    header: prop,
                                },
                                properties: [
                                    {
                                        type: 'number',
                                        name: 'low',
                                        displayName: 'Dry',
                                    },
                                    {
                                        type: 'number',
                                        name: 'high',
                                        displayName: 'Wet',
                                    }
                                ]
                            } as FormObject
                        })
                    ]
                },
            ],
            actionsButtons: {
                    container: {
                        class: ['button-row']
                    },
                    submit: {
                        title: 'Submit',
                        style: 'mat-flat-button',
                        color: 'primary',
                    },
                    extra: [
                        {
                            title: 'Calibrate',
                            style: 'mat-flat-button',
                            color: 'accent',
                            if: () => true,
                            click: (router) => from(router.navigate(['/', 'calibrate', mainboardId, moduleId])).pipe(map(() => {}))
                        } as Button,
                    ]
            },
            event: {
                afterFormCreated: (fG: UntypedFormGroup) => {
                    formGroup = fG;
                },
                submit: (data) => {
                    return growbeActionAPI.executeActionModule('GROWBE_CONFIG_UPDATE', mainboardId, moduleId, data.object);
                },
                
                initialData: () =>
                    of({ object: config}),
            },
        }
    };
