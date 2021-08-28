import { AutoFormData, FormObject } from "@berlingoqc/ngx-autoform";
import { GrowbeModule, GrowbeModuleWithRelations } from "@growbe2/ngx-cloud-api";
import { of } from "rxjs";
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
  moduleDefService: GrowbeModuleDefAPI,
) => {
  return {
    type: 'dialog',
    typeData: {
      minWidth: '50%'
    },
    event: {
      initialData: () => of(({object: { moduleId: module.id}})),
      submit: (value: any) => {
        const alarm = Object.assign(value.object, {moduleId: module.id});
        return moduleDefService.addAlarm(module.mainboardId, alarm);
      },
    },
    items: [
      {
        type: 'object',
        name: 'object',
        properties: [
          {
            name: 'moduleId',
            type: 'string',
            decorators: {
              style: {
                'width': '300px'
              }
            },
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
                options: {
                  value: () => of(Object.keys(module.moduleDef.properties).filter(
                    item => existingAlarmProperties.indexOf(item) === -1
                  ))
                }
              }
            }
          },
          alarmField('low'),
          alarmField('high'),
        ],
      } as FormObject,
    ],
  } as AutoFormData;
};
