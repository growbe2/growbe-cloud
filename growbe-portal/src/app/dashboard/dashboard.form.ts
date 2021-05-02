import { AutoFormData, DialogFormContainer, InputProperty } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { Subject } from 'rxjs';
import { DashboardItem } from './dashboard.model';
import { DashboardService } from './dashboard.service';

export const getCopyDashboardForm = (
    service: DashboardService,
    updatePanel: Subject<any>,
    item: DashboardItem,
): AutoFormData => ({
    type: 'dialog',
    typeData: {
      width: '600px',
      height: '400px'
    } as DialogFormContainer,
    event: {
      submit: (data: any) => {
        return service.addItemToPanelDashboard({
          dashboardId: data.item.dashboard.id,
          panelName: data.item.panel.name,
        }, item).pipe(notify({
          title: 'Copy !!'
        }));
      }
    },
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
                                value: updatePanel.asObservable(),
                            },
                        },
                    } as any,
                } as InputProperty,
            ],
        },
      ]
});
