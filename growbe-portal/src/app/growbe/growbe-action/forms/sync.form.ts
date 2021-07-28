import { AutoFormData, AutoFormModule } from '@berlingoqc/ngx-autoform';

export const growbeSyncForm = (): AutoFormData => ({
    type: 'dialog',
    typeData: {},
    items: [
        {
            type: 'object',
            name: 'object',
            properties: [],
        },
    ],
    event: {
        submit: null,
    },
});
