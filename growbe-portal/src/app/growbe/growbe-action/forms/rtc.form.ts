import { AutoFormData, AutoFormModule } from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { timeFieldComponent } from 'src/app/shared/timeframe/timeframe-select/timeframe-select.component';

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
        },
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
