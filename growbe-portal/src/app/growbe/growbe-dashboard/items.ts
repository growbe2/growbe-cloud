import { Inject, inject, Injector } from '@angular/core';
import { InputProperty } from '@berlingoqc/ngx-autoform';
import { DashboardRegistryItem } from '@growbe2/growbe-dashboard';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { ModuleSensorValueGraphComponent } from 'src/app/growbe/module/graph/module-sensor-value-graph/module-sensor-value-graph.component';
import { StreamPlayerComponent } from 'src/app/growbe/video-stream/stream-player/stream-player.component';
import { TableLayoutComponent } from 'src/app/shared/table-layout/table-layout/table-layout.component';
import { TerminalComponent } from 'src/app/shared/terminal/terminal/terminal.component';
import { GrowbeStateComponent } from '../growbe-mainboard/component/growbe-state/growbe-state.component';
import { GrowbeModuleConfigComponent } from '../module/component/growbe-module-config/growbe-module-config.component';
import { GrowbeModuleDataTableComponent } from '../module/component/growbe-module-data-table/growbe-module-data-table.component';
import { GrowbeModuleDefComponent } from '../module/component/growbe-module-def/growbe-module-def.component';
import { ModuleStatusDotComponent } from '../module/component/module-status-dot/module-status-dot.component';
import { ModuleGraphBuilderComponent } from '../module/graph/module-graph-builder/module-graph-builder.component';
import { ModuleLastValueComponent } from '../module/graph/module-last-value/module-last-value.component';
import { SoilModuleComponent } from '../module/svg/soil/soil-module/soil-module.component';
import { THLModuleComponent } from '../module/svg/thl/thl-module/thl-module.component';
import { WCModuleComponent } from '../module/svg/wc/wc-module/wc-module.component';

const getDashboardAndModuleProperty = (injector: Injector, includeModule) => {
  const mainboardAPI = injector.get(GrowbeMainboardAPI);
  const formProperty = [];

  formProperty.push({
    name: 'mainboardId',
    type: 'string',
    displayName: 'Growbe',
    component: {
      name: 'select',

    }

  });

  if (includeModule) {
    formProperty.push({});
  }status

  return formProperty;
};

const moduleIdProperty = {
  type: 'string',
  name: 'moduleId',
} as InputProperty;

export const DASHBOARD_ITEMS: (injector: Injector) => DashboardRegistryItem[] = (injector: Injector) => [
    {
        name: '',
        component: 'growbe-module-data-table',
        componentType: GrowbeModuleDataTableComponent,
        inputs: {
            moduleId: moduleIdProperty,
        },
    },
    {
        name: '',
        component: 'growbe-module-sensor-value-graph',
        componentType: ModuleSensorValueGraphComponent,
        inputs: {
            data: {
                type: 'object',
                name: 'string',
            },
        },
    },
    {
        name: '',
        component: 'growbe-module-last-value',
        componentType: ModuleLastValueComponent,
        inputs: {
        },
    },
    {
        name: '',
        component: 'growbe-state',
        componentType: GrowbeStateComponent,
        inputs: {
        },
    },
    {
        name: '',
        component: 'growbe-module-def',
        componentType: GrowbeModuleDefComponent,
        inputs: {
        },
    },
    {
        name: '',
        component: 'growbe-module-state',
        componentType: ModuleStatusDotComponent,
        inputs: {
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
        description: '',
        componentType: GrowbeModuleConfigComponent,
        inputs: {
            moduleId: {
                type: 'string',
                name: 'moduleId',
                required: true,
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
                name: 'timeSelected',
            },
        },
    },
    {
        name: '',
        component: 'logs-terminal',
        componentType: TerminalComponent,
    },
    {
        name: '',
        component: 'video-stream',
        componentType: StreamPlayerComponent,
    },
    {
        name: '',
        component: 'AAS-module',
        componentType: SoilModuleComponent,
        inputs: {},
        outputs: {}
    },
    {
        name: '',
        component: 'AAA-module',
        componentType: THLModuleComponent,
        inputs: {},
        outputs: {}
    },
    {
        name: '',
        component: 'AAB-module',
        componentType: WCModuleComponent,
        inputs: {},
        outputs: {},
    }
];
