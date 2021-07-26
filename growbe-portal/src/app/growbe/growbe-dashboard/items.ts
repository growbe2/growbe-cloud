import { DashboardRegistryItem } from '@growbe2/growbe-dashboard';
import { ModuleSensorValueGraphComponent } from 'src/app/growbe/module/graph/module-sensor-value-graph/module-sensor-value-graph.component';
import { TableLayoutComponent } from 'src/app/shared/table-layout/table-layout/table-layout.component';
import { GrowbeStateComponent } from '../growbe-mainboard/component/growbe-state/growbe-state.component';
import { GrowbeModuleConfigComponent } from '../module/component/growbe-module-config/growbe-module-config.component';
import { GrowbeModuleDataTableComponent } from '../module/component/growbe-module-data-table/growbe-module-data-table.component';
import { GrowbeModuleDefComponent } from '../module/component/growbe-module-def/growbe-module-def.component';
import { ModuleStatusDotComponent } from '../module/component/module-status-dot/module-status-dot.component';
import { ModuleGraphBuilderComponent } from '../module/graph/module-graph-builder/module-graph-builder.component';
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
    {
        name: '',
        component: 'growbe-module-state',
        componentType: ModuleStatusDotComponent,
        inputs: {
            module: {
                type: 'object',
            },
        },
    },
    {
        name: '',
        component: 'growbe-alarm',
        componentType: TableLayoutComponent,
        inputs: {}
    },
    {
        name: '',
        component: 'growbe-module-config',
        componentType: GrowbeModuleConfigComponent,
        inputs: {
            moduleId: {
                type: 'string',
            },
        },
    },
    {
        name: '',
        component: 'graph-builder',
        componentType: ModuleGraphBuilderComponent,
        inputs: {},
        outputs: {
            timeSelected: {
                type: 'object',
            },
        },
    },
];
