import { FormControl } from '@angular/forms';
import {
    AutoFormData,
    DialogFormContainer,
    DictionnayProperty,
    FormObject,
    InputProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DashboardItem, Style } from './dashboard.model';
import {
    DashboardRef,
    DashboardService,
    PanelDashboardRef,
} from './dashboard.service';
import { DashboardRegistryService } from './registry';

export const modifyDialog = (
    myIndex: number,
    panel: PanelDashboardRef,
    dashboardItem: DashboardItem & Style,
    dashboardService: DashboardService,
    registry: DashboardRegistryService,
): AutoFormData => {
    console.log('ITE', dashboardItem.inputs);
    return {
        type: 'dialog',
        typeData: {
            width: '600px',
            height: '800px',
        },
        items: [
            {
                type: 'dic',
                name: 'inputs',
                availableProperty:
                    Object.values(
                        registry.getItem(dashboardItem.component)?.inputs,
                    ) ?? [],
            } as DictionnayProperty,
            {
                type: 'dic',
                name: 'style',
                availableProperty: [
                    {
                        name: 'grid-column-start',
                        type: 'string',
                    },
                    {
                        name: 'grid-column-end',
                        type: 'string',
                    },
                ],
            } as DictionnayProperty,
        ],
        event: {
            afterFormCreated: (form) => {
              form.patchValue({
              //index: myIndex,
              inputs: dashboardItem.inputs ?? {},
              style: dashboardItem.style ?? {},
            })
            },
            submit: (value) =>
                dashboardService.updateItemFromPanel(
                    panel,
                    Object.assign(dashboardItem, { inputs: value.inputs, style: value.style }),
                    value.index,
                ),
        },
    };
};

export const addPanelForm = (
    service: DashboardService,
    dashboardRef: DashboardRef,
): AutoFormData => ({
    type: 'simple',
    items: [
        {
            type: 'object',
            name: 'item',
            properties: [
                {
                    name: 'name',
                    type: 'string',
                    required: true,
                    displayName: 'Name of the panel',
                },
            ],
        } as FormObject,
    ],
    event: {
        submit: (data: any) => {
            return service.addPanelToDasboard(dashboardRef, {
                name: data.item.name,
                items: [],
            });
        },
    },
});

export const getCopyDashboardForm = (
    service: DashboardService,
    updatePanel: Subject<any>,
    item: DashboardItem,
): AutoFormData => {
    const subject = new BehaviorSubject(null);
    let moduleControl: FormControl;
    return {
        type: 'dialog',
        typeData: {
            width: '600px',
            height: '400px',
        } as DialogFormContainer,
        event: {
            initialData: () => of({ dashboard: { name: item.name } }),
            submit: (data: any) => {
                return service
                    .addItemToPanelDashboard(
                        {
                            dashboardId: data.item.dashboard.id,
                            panelName: data.item.panel.name,
                        },
                        { ...item, name: data.item.name, id: Date.now() },
                    )
                    .pipe(
                        notify({
                            title: 'Copy !!',
                        }),
                    );
            },
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
                        valuesChanges: (control, value) => {
                          service.getDashboards().subscribe((dashboards) => {
                             const dashboard = dashboards.find(
                              (x) => x.name === value.name,
                            );
                            moduleControl.enable();
                            subject.next(dashboard.panels);
                          });
                        },
                        component: {
                            name: 'select',
                            type: 'mat',
                            options: {
                                displayTitle: 'Dashboard',
                                displayContent: (e) => e.name,
                                value: () => service.getDashboards(),
                            },
                        } as SelectComponent,
                    },
                    {
                        name: 'panel',
                        type: 'string',
                        displayName: 'Panel',
                        disabled: true,
                        initialize: (mc:FormControl) => (moduleControl = mc),
                        component: {
                            name: 'select',
                            type: 'mat',
                            options: {
                                displayTitle: 'Panel',
                                displayContent: (e) => e.name,
                                value: subject.pipe(
                                  filter(item => item !== null),
                                ),
                            },
                        } as SelectComponent,
                    } as InputProperty,
                    {
                        name: 'name',
                        type: 'string',
                        displayName: 'Name',
                        required: true,
                        errors: {
                            alreadyExists: {
                                text: 'Name already taken in this panel',
                            },
                        },
                    },
                ],
            } as FormObject,
        ],
    };
};
