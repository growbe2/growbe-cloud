import { DashboardRegistryItem } from 'src/app/dashboard/registry/dashboard.registry';
import { ModuleSensorValueGraphComponent } from 'src/app/growbe/module/graph/module-sensor-value-graph/module-sensor-value-graph.component';
import { GrowbeStateComponent } from '../growbe-mainboard/component/growbe-state/growbe-state.component';
import { GrowbeModuleDataTableComponent } from '../module/component/growbe-module-data-table/growbe-module-data-table.component';
import { GrowbeModuleDefComponent } from '../module/component/growbe-module-def/growbe-module-def.component';
import { ModuleLastValueComponent } from '../module/graph/module-last-value/module-last-value.component';

export const DASHBOARD_ITEMS: DashboardRegistryItem[] = [
    {
        name: '',
        component: 'growbe-module-data-table',
        componentType: GrowbeModuleDataTableComponent,
        inputs: {
            module: {
                type: 'object',
            },
        },
    },
    {
        name: '',
        component: 'growbe-module-sensor-value-graph',
        componentType: ModuleSensorValueGraphComponent,
        inputs: {
            data: {
                type: 'object',
            },
        },
    },
    {
        name: '',
        component: 'growbe-module-last-value',
        componentType: ModuleLastValueComponent,
        inputs: {
            data: {
                type: 'object',
            },
        },
    },
    {
        name: '',
        component: 'growbe-state',
        componentType: GrowbeStateComponent,
        inputs: {
            data: {
                type: 'object',
            },
        },
    },
    {
        name: '',
        component: 'growbe-module-def',
        componentType: GrowbeModuleDefComponent,
        inputs: {
            moduleDefId: {
                type: 'string',
            },
        },
    },
];