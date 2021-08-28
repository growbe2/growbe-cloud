import { AutoFormData, AutoFormModule, FormObject } from '@berlingoqc/ngx-autoform';

export const growbeSyncForm = (): AutoFormData => ({
    type: 'dialog',
    typeData: {},
    items: [
        {
            type: 'object',
            name: 'object',
            properties: [],
        } as FormObject,
    ],
    event: {
        submit: null,
    },
});
