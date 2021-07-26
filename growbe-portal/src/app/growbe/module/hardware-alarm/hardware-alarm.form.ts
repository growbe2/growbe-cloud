import { AutoFormData } from "@berlingoqc/ngx-autoform";
import { GrowbeModule } from "@growbe2/ngx-cloud-api";
import { GrowbeModuleDefAPI } from "../../api/growbe-module-def";


export const alarmField = (name) => (          {
  name,
  type: 'object',
  properties: [
    {
      name: 'value',
      type: 'number'
    },
    {
      name: 'offset',
      type: 'number'
    }
  ]
});

export const getHardwareAlarmForm = (
  module: GrowbeModule,
  moduleDefService: GrowbeModuleDefAPI,
) => {
  return {
    type: 'simple',
    event: {
      initialData: () => ({object: { moduleId: module.uid}}),
      submit: (value: any) => {
        console.log('value', value);
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
            displayName: 'Module ID',
            disabled: true,
          },
          {
            name: 'property',
            type: 'string',
            displayName: 'Property',
          },
          alarmField('low'),
          alarmField('high'),
        ],
      }
    ],
  } as AutoFormData;
};
