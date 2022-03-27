import { AutoFormData, FormObject, SelectComponent } from "@berlingoqc/ngx-autoform";
import { GrowbeModule, GrowbeModuleWithRelations } from "@growbe2/ngx-cloud-api";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { HardwareAlarmRelation } from "../../api/growbe-mainboard";
import { GrowbeModuleDefAPI } from "../../api/growbe-module-def";


export const alarmField = (name) => ({
  name,
  type: 'object',
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
) => {
  return {
    type: 'dialog',
    typeData: {
      minWidth: '50%'
    },
    event: {
      initialData: () => of(value ? value : { moduleId: module.id}),
      submit: (value: any) => {
        const alarm = Object.assign(value, {moduleId: module.id});
        return edit ? api.updateById(alarm.property, alarm).pipe(
          tap(() => api.requestGet.onModif(of()).subscribe()),
        ) : api.post(alarm);
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
            required: true,
            component: {
              name: 'select',
              type: 'mat',
              options: {
                displayTitle: 'Property',
                displayContent: (e) => e,
                  value: () => of(Object.keys(module.moduleDef.properties).filter(
                    item => existingAlarmProperties.indexOf(item) === -1
                  ))
              }
            } as SelectComponent,
          },
          alarmField('low'),
          alarmField('high'),
        ],
  } as AutoFormData;
};
