import {
    AutoFormData,
    DialogFormContainer,
    FormObject,
} from '@berlingoqc/ngx-autoform';
import { GrowbeModuleDefWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable, of } from 'rxjs';

export const growbeModuleDefForm = (
    moduleDef: GrowbeModuleDefWithRelations,
    callback: (data: any) => Observable<any>,
): AutoFormData => ({
    type: 'dialog',
    typeData: {
        width: '100%',
        height: '100%',
        panelClass: 'auto-form-dialog',
    } as DialogFormContainer,
    items: [
        {
            type: 'object',
            name: 'object',
            templates: {
                header: 'Module definition',
            },
            properties: [
                {
                    name: 'name',
                    type: 'string',
                    displayName: 'Type',
                    disabled: true,
                },
                {
                    name: 'displayName',
                    displayName: 'Display Name',
                    type: 'string',
                },
                {
                    name: 'properties',
                    type: 'object',
                    displayName: 'Properties',
                    properties: [
                        ...Object.values(moduleDef.properties).map(
                            (prop) =>
                                ({
                                    type: 'object',
                                    name: prop.name,
                                    templates: {
                                        header: `${prop.name} configuration`,
                                    },
                                    properties: [
                                        {
                                            type: 'string',
                                            name: 'name',
                                            displayName: 'Name property',
                                            disabled: true,
                                        },
                                        {
                                            type: 'string',
                                            name: 'displayName',
                                            displayName: 'Displaying name',
                                        },
                                        {
                                            type: 'string',
                                            name: 'definition',
                                            displayName: 'Definition',
                                        },
                                        {
                                            type: 'object',
                                            name: 'operationalRange',
                                            properties: [
                                                {
                                                    type: 'number',
                                                    name: 'min',
                                                },
                                                {
                                                    type: 'number',
                                                    name: 'max',
                                                },
                                            ],
                                        },
                                    ],
                                } as any),
                        ),
                    ],
                },
            ],
        } as FormObject,
    ],
    event: {
        submit: (d: any) => {
            Object.entries(d.object.properties).forEach(([k, v]) => {
                (v as any).name = k;
            });
            return callback(d.object);
        },
        initialData: () =>
            of({
                object: moduleDef,
            }),
    },
});
