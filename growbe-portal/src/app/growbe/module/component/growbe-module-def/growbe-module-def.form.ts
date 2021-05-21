import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { ArrayProperty, AutoFormData, InputProperty } from "@berlingoqc/ngx-autoform";
import { GrowbeModuleDef } from "@growbe2/ngx-cloud-api";
import { Observable, of } from "rxjs";

export const growbeModuleDefForm = (moduleDef: GrowbeModuleDef, callback: (data: any) => Observable<any>): AutoFormData => ({
  type: 'simple',
  items: [
    {
      type: 'object',
      name: 'object',
      properties: [
        {
          name: 'name',
          type: 'string',
          disabled: true,
        },
        {
          name: 'displayName',
          type: 'string',
        },
        {
          name: 'properties',
          type: 'object',
          properties: [
            ...Object.values(moduleDef.properties).map((prop) => ({
              type: 'object',
              name: prop.name,
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
                  displayName: 'Displaying name'
                },
                {
                  type: 'string',
                  name: 'definition',
                  displayName: 'Definition'
                }
              ]
            } as any))
          ]
        }
      ],
    }
  ],
  event: {
    submit: (d: any) => {
      Object.entries(d.object.properties).forEach(([k,v]) => {
        (v as any).name = k
      });
      return callback(d.object);
    },
    initialData: () => of({
      object: moduleDef
    }),
  }
});
