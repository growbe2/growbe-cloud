import { MatLegacyDialogClose as MatDialogClose, MatLegacyDialogConfig as MatDialogConfig } from "@angular/material/legacy-dialog";
import { ArrayProperty, AutoFormData, DictionnayProperty, FormObject, InputProperty, SelectComponent } from "@berlingoqc/ngx-autoform";
import { CRUDDataSource } from "@berlingoqc/ngx-loopback";
import { GrowbeModuleWithRelations, VirtualRelayWithRelations } from "@growbe2/ngx-cloud-api";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";



const AAB_mapping = ['p0', 'p1', 'p2', 'drain', 'pump0', 'pump1', 'pump2', 'pump3'];
const AAP_mapping = ['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];

const getMapping = (moduleId: string) => {
  switch (moduleId[2]) {
    case 'B':
      return AAB_mapping;
    case 'P':
      return AAP_mapping;
    default:
      throw new Error("mapping not found for " + moduleId);
  }
}

const getPropertyToIndex = (moduleId: string, property: string) => {
  let mapping = getMapping(moduleId);
  return mapping.indexOf(property);
}

const getIndexToProperty = (moduleId: string, propertyIndex: number) => {
  let mapping = getMapping(moduleId);
  return mapping[propertyIndex];
}


export const getCreateVirtualRelayForm = (
    growbeId: string,
    moduleDataSource: CRUDDataSource<GrowbeModuleWithRelations>,
    client: CRUDDataSource<VirtualRelayWithRelations>,
): Observable<AutoFormData> => {

    return moduleDataSource.get({include: [{relation: 'moduleDef'}]}).pipe(
        map((modules) => (
            {
                type: 'dialog',
                typeData: {
                    width: '100%',
                    height: '100%',
                    panelClass: 'auto-form-dialog',
                } as MatDialogConfig,
                event: {
                    submit: (value) => {
                      Object.entries(value.relays).forEach(([key, module]: [string, any]) => {
                        module.properties.forEach((prop) => {
                          prop.property = getPropertyToIndex(key, prop.property)
                        })
                      })
                      return client.post(value)
                    },
                },
                items: [
                    {
                        type: 'string',
                        name: 'name',
                        displayName: 'ID of the virtual relay',
                        required: true,
                        hint: 'Must be a unique, small identifier for your virtual relay'
                    } as InputProperty,
                    {
                        type: 'dic',
                        name: 'relays',
                        templates: {
                          header: 'Add a module to the virtual relay'
                        },
                        availableProperty: modules.filter(module => module.id[2] === 'B' || module.id[2] === 'P').map(module => ({
                            name: module.id,
                            displayName: module.moduleDef?.displayName || module.id,
                            type: 'object',
                            properties: [
                                {
                                    type: 'array',
                                    name: 'properties',
                                    min: 1,
                                    elementType: {
                                        type: 'object',
                                        name: '',
                                        properties: [
                                          {
                                            name: 'property',
                                            type: 'string',
                                            required: true,
                                            templates: {
                                              hint: 'dada'
                                            },
                                            component: {
                                              name: 'select',
                                              transformValue: (e) => e.name,
                                              options: {
                                                displayContent: (e) => e.displayName || e.name,
                                                value: Object.values(module.moduleDef.properties),
                                              }
                                            } as SelectComponent
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
