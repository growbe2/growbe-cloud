import { MatDialogClose, MatDialogConfig } from "@angular/material/dialog";
import { ArrayProperty, AutoFormData, DictionnayProperty, FormObject } from "@berlingoqc/ngx-autoform";
import { CRUDDataSource } from "@berlingoqc/ngx-loopback";
import { GrowbeModuleWithRelations, VirtualRelayWithRelations } from "growbe-cloud-api/lib";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GrowbeMainboardAPI } from "../../api/growbe-mainboard";




export const getCreateVirtualRelayForm = (
    growbeId: string,
    moduleDataSource: CRUDDataSource<GrowbeModuleWithRelations>,
    client: CRUDDataSource<VirtualRelayWithRelations>,
): Observable<AutoFormData> => {

    return moduleDataSource.get().pipe(
        map((modules) => (
            {
                type: 'dialog',
                typeData: {
                    minWidth: '30%',
                    minHeight: '600px',
                    panelClass: 'mat-dialog-override'
                } as MatDialogConfig,
                event: {
                    submit: (value) => client.post(value),
                },
                items: [
                    {
                        type: 'string',
                        name: 'name',
                    },
                    {
                        type: 'dic',
                        name: 'relays',
                        availableProperty: modules.filter(module => module.id[2] === 'B' || module.id[2] === 'P').map(module => ({
                            name: module.id,
                            type: 'object',
                            properties: [
                                {
                                    type: 'array',
                                    name: 'properties',
                                    elementType: {
                                        type: 'object',
                                        name: '',
                                        properties: [

                                            {
                                                type: 'string',
                                                name: 'property'
                                            },
                                            {
                                                type: 'bool',
                                                name: 'falseState',
                                                value: false,
                                                component: {
                                                    name: 'mat'
                                                }
                                            },
                                            {
                                                type: 'bool',
                                                name: 'trueState',
                                                value: true,
                                                component: {
                                                    name: 'mat'
                                                }
                                            },
                                        ]
                                    } as FormObject,
                                } as ArrayProperty,

                            ]
                        } as FormObject)),
                    } as DictionnayProperty
                ]
            }
        ))
    )
}