import { AutoFormData, FormObject, SelectComponent } from "@berlingoqc/ngx-autoform";
import { GrowbeModule, GrowbeModuleWithRelations } from "@growbe2/ngx-cloud-api";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { HardwareAlarmRelation } from "../../api/growbe-mainboard";


export const alarmField = (name) => ({
  name,
  type: 'object',
  templates: {
    header: name,
  },
  properties: [
    {
      name: 'value',
      type: 'number',
      required: true,
    },
    {
      name: 'offset',
      type: 'number'
    }
  ]
});

export const getHardwareAlarmForm = (
  module: GrowbeModuleWithRelations,
  existingAlarmProperties: string[],
  api: HardwareAlarmRelation,
  value?: any,
  edit?: boolean,
  cbSubmit?: () => void,
) => {
  let savedValue: any;
  return {
    type: 'dialog',
    typeData: {
        width: '100%',
        height: '100%',
        panelClass: 'auto-form-dialog',
    },
    event: {
      initialData: (v) => {
        savedValue = v ? v : { moduleId: module.id};
        return of(savedValue);
      },
      submit: (value: any) => {
        const alarm = Object.assign(value, {moduleId: module.id});
        if (edit) {
          alarm.property = savedValue.property;
        }
        return (edit ? api.updateById(alarm.property, alarm).pipe(
          //tap(() => api.requestGet.onModif(of(null)).subscribe(() => {})),
        ) : api.post(alarm)).pipe(
          tap(() => {
            cbSubmit?.();
          })
        );
      },
    },
    items: [
          {
            name: 'moduleId',
            type: 'string',
            displayName: 'Module ID',
            disabled: true,
          },
          {
            name: 'property',
            type: 'string',
            displayName: 'Property',
            disabled: edit,
            required: true,
            component: {
              name: 'select',
              type: 'mat',
              transformValue: (v) => v[0],
              options: {
                displayTitle: 'Property',
                displayContent: e => e[1].displayName || e[1].name,
                  value: () => of(Object.entries(module.moduleDef.properties).filter(
                    item => existingAlarmProperties.indexOf(item[0]) === -1
                  ))
              }
            } as SelectComponent,
          },
          alarmField('low'),
          alarmField('high'),
        ],
  } as AutoFormData;
};
