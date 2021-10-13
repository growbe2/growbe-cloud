import { AutoFormData, FormObject } from '@berlingoqc/ngx-autoform';
import { timeFieldComponent } from '../../module/graph/service/growbe-graph.service';

export const growbeRtcForm = (): AutoFormData => ({
    type: 'dialog',
    typeData: {},
    items: [
        {
            type: 'object',
            name: 'object',
            properties: [
                {
                    type: 'date',
                    name: 'date',
                },
                {
                    type: 'string',
                    name: 'hour',
                    component: timeFieldComponent,
                },
            ],
        } as FormObject,
    ],
    event: {
        submit: null,
        afterFormCreated: (form) => {
            const date = new Date();
            form.setValue({
                object: {
                    date,
                    hour: `${date.getHours()}:${date.getMinutes()}`,
                },
            });
        },
    },
});
