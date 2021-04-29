import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { of, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';

export const getCopyDashboardForm = (
    service: DashboardService,
): AutoFormData => ({
    type: 'dialog',
    items: [
        {
            type: 'object',
            name: 'item',
            properties: [
                {
                    name: 'dashboard',
                    type: 'string',
                    displayName: 'Dashboard',
                    component: {
                        name: 'select',
                        type: 'mat',
                        options: {
                            displayTitle: 'Dashboard',
                            displayContent: (e) => e.name,
                            options: {
                                value: () => service.getDashboards(),
                            },
                        },
                    } as any,
                },
                {
                    name: 'panel',
                    type: 'string',
                    displayName: 'Panel',
                    disabled: true,
                    component: {
                        name: 'select',
                        type: 'mat',
                        options: {
                            displayTitle: 'Panel',
                            displayContent: (e) => e.name,
                            options: {
                                value: [],
                            },
                        },
                    } as any,
                } as any,
            ],
        },
    ],
});
