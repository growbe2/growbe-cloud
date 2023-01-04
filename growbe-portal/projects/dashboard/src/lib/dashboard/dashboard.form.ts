import { UntypedFormControl } from '@angular/forms';
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
    panel: PanelDashboardRef,
    dashboardItem: DashboardItem & Style,
    dashboardService: DashboardService,
    registry: DashboardRegistryService,
): AutoFormData => {

    const properties =  Object.values(
                        registry.getItem(dashboardItem.component)?.inputs,
                    ) ?? [];
    return {
        type: 'dialog',
        typeData: {
            width: '100%',
            height: '100%',
            panelClass: 'auto-form-dialog',
        },
        items: [
            {
              name: 'name',
              type: 'string',
              required: true,
            },
            {
                type: 'dic',
                name: 'inputs',
                availableProperty: properties,
            } as DictionnayProperty,
            {
                type: 'dic',
                name: 'style',
                availableProperty: [
                    {
                        name: 'grid-column',
                        type: 'string',
                    },
                    {
                        name: 'grid-row',
                        type: 'string',
                    },
                                        {
                        name: 'grid-column-start',
                        type: 'string',
                    },
                    {
                        name: 'grid-column-end',
                        type: 'string',
                    },
                   {
                        name: 'grid-row-start',
                        type: 'string',
                    },
                    {
                        name: 'grid-row-end',
                        type: 'string',
                    },

                ],
            } as DictionnayProperty,
        ],
        event: {
            afterFormCreated: (form) => {
              const inputs = dashboardItem.inputs ?? {};
              const requiredProperties = properties.filter(x => x.required);
              requiredProperties.forEach(prop => {
                if (!inputs[prop.name]) {
                  inputs[prop.name] = null;
                }
              });
              form.patchValue({
                name: dashboardItem.name,
                inputs: inputs,
                style: dashboardItem.style ?? {},
              })
            },
            submit: (value) =>
                dashboardService.updateItemFromPanel(
                    panel,
                    Object.assign(dashboardItem, { inputs: value.inputs, style: value.style, name: value.name }),
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
    let moduleControl: UntypedFormControl;
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
                            transformValue: (e) => e,
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
                        initialize: (mc:UntypedFormControl) => (moduleControl = mc),
                        component: {
                            name: 'select',
                            transformValue: (e) => e,
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
