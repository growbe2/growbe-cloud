import { Inject, inject, Injectable, Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AuthService } from '@berlingoqc/auth';
import {
  ArrayProperty,
  FormObject,
    IProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { ArrayFieldComponent } from '@berlingoqc/ngx-autoform/lib/fields/array-field/array-field.component';
import {
    DashboardRegistryItem,
    DashboardRegistryService,
} from '@growbe2/growbe-dashboard';
import { GraphModuleRequest } from '@growbe2/ngx-cloud-api';
import { GrowbeMainboard, GrowbeModule } from 'dist/growbe-cloud-api/lib';
import { combineLatest, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { ModuleSensorValueGraphComponent } from 'src/app/growbe/module/graph/module-sensor-value-graph/module-sensor-value-graph.component';
import { StreamPlayerComponent } from 'src/app/growbe/video-stream/stream-player/stream-player.component';
import { TableLayoutComponent } from 'src/app/shared/table-layout/table-layout/table-layout.component';
import { TerminalComponent } from 'src/app/shared/terminal/terminal/terminal.component';
import { GrowbeModuleAPI } from '../api/growbe-module';
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

@Injectable()
export class GrowbeDashboardRegistry implements DashboardRegistryService {
    items: { [id: string]: DashboardRegistryItem } = {};

    constructor(
        private mainboardAPI: GrowbeMainboardAPI,
        private moduleAPI: GrowbeModuleAPI,
        private authService: AuthService,
    ) {
        this.mainboardAPI.get({}).subscribe(() => {});
        [
            {
                name: '',
                component: 'growbe-module-data-table',
                componentType: GrowbeModuleDataTableComponent,
                inputs: {
                    ...this.getDashboardAndModuleProperty(true)[0],
                },
            },
            {
                name: '',
                component: 'growbe-module-sensor-value-graph',
                componentType: ModuleSensorValueGraphComponent,
                inputs: {
                  ...this.getGraphModuleRequestProperty(false),
                },
            },
            {
                name: '',
                component: 'growbe-module-last-value',
                componentType: ModuleLastValueComponent,
                inputs: {
                  ...this.getGraphModuleRequestProperty(true),
                },
            },
            {
                name: '',
                component: 'growbe-state',
                componentType: GrowbeStateComponent,
                inputs: {},
            },
            {
                name: '',
                component: 'growbe-module-def',
                componentType: GrowbeModuleDefComponent,
                inputs: {},
            },
            {
                name: '',
                component: 'growbe-module-state',
                componentType: ModuleStatusDotComponent,
                inputs: {},
            },
            {
                name: '',
                component: 'growbe-alarm',
                componentType: TableLayoutComponent,
                inputs: {},
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
                outputs: {},
            },
            {
                name: '',
                component: 'AAA-module',
                componentType: THLModuleComponent,
                inputs: {},
                outputs: {},
            },
            {
                name: '',
                component: 'AAB-module',
                componentType: WCModuleComponent,
                inputs: {},
                outputs: {},
            },
            {
                name: '',
                component: 'AAP-module',
                componentType: WCModuleComponent,
                inputs: {},
                outputs: {},
            },

        ].forEach((item: any) => this.addItem(item));
    }

    addItem(item: DashboardRegistryItem): void {
        this.items[item.component] = item;
    }
    getItem(component: string): DashboardRegistryItem {
        return this.items[component];
    }


    private getGraphModuleRequestProperty = (oneValue = true) => {
      const [formMM, subjectMainboard, subjectModule] = this.getDashboardAndModuleProperty(true, 'growbeId');
      const formProperty: { [id: string]: IProperty } = {
	      ...formMM,
      };

      // add shit for lastX and everythig
      if (!oneValue) {
        formProperty['lastX'] = {
          name: 'lastX',
          type: 'number'
        };
        formProperty['lastXUnit'] = {
          name: 'lastXUnit',
          type: 'string',
          component: {
            name: 'select',
            transformValue: (e) => e,
            options: {
              displayContent: (e) => e,
              value: of(Object.values(GraphModuleRequest.LastXUnitEnum))
            }
          } as SelectComponent,
        };
      } else {
        let previousMainboard;
        formProperty['fields'] = {
          type: 'array',
          name: 'fields',
          max: 1,
          min: 1,
          elementType: {
            name: '',
            type: 'string',
            component: {
              name: 'select',
              transformValue: (e) => e[0],
              compareWith: (a , b) => {
                return a === b;
              },
              options: {
                displayContent: (e) => e[1].displayName || e[1].name,
                value: subjectModule.pipe(
                  filter(item => item != null),
                  switchMap((moduleId) => {
                      return this.moduleAPI.moduleDef(moduleId).get().pipe(
                        map((moduleDef) => Object.entries(moduleDef.properties))
                      )
                  }),
                )
              }
            } as SelectComponent,
          }
        } as ArrayProperty
      }

      formProperty['liveUpdate'] = {
        name: 'liveUpdate',
        type: 'bool',
        component: {
          name: 'checkbox',
        }
      };

      const form = {
        graphDataConfig: {
          name: 'graphDataConfig',
          type: 'object',
          required: true,
          properties: Object.values(formProperty)
        } as FormObject,
      };
      return form;
    }

    private getDashboardAndModuleProperty = (includeModule: boolean, mainboardPropertyName = 'mainboardId'): [
      {[id: string]: IProperty;},
      BehaviorSubject<string>,
      BehaviorSubject<string>,
    ] => {
        const formProperty: { [id: string]: IProperty } = {};

        const subjectMainboard = new BehaviorSubject(null);
        const subjectModule = new BehaviorSubject(null);
        let moduleControl: AbstractControl;
        let lastMainboarId: string;

        formProperty[mainboardPropertyName] = {
            name: mainboardPropertyName,
            type: 'string',
            displayName: 'Growbe',
            required: true,
            initialize: (control) => {
              if (control.value) {
                subjectMainboard.next(control.value);
                lastMainboarId = control.value;
              }
            },
            valuesChanges: (control, value) => {
              moduleControl.enable();
              subjectMainboard.next(value);
              lastMainboarId = value;
            },
            component: {
                name: 'select',
                type: 'mat',
                compareWith: (a, b) => {
                  return a === b;
                },
                transformValue: (e) => e.id,
                options: {
                    displayTitle: 'Growbe',
                    displayContent: (e) => e.id + ' ' + e.name,
                    value: () =>
                        this.mainboardAPI
                            .userGrowbeMainboard(
                                this.authService.profile.id,
                            )
                            .get({}),
                },
            } as SelectComponent,
        };

        if (includeModule) {
          formProperty['moduleId'] = {
            name: 'moduleId',
            type: 'string',
            required: true,
            initialize: (control) => {
              moduleControl = control;
              if (!control.value) {
                control.disable();
              } else {
                subjectModule.next(control.value)
              }
            },
            valuesChanges: (control, value) => {
              console.log('CACA', control.disabled, value);
              subjectModule.next(value);
            },
            component: {
              name: 'select',
              type: 'mat',
              compareWith: (a ,b) => {
                return a === b;
              },
              transformValue: (e) => e.id,
              options: {
                displayTitle: 'Module',
                displayContent: (e) => e.id,
                value: () => subjectMainboard.pipe(
                  filter(id => id),
                  switchMap((id) => this.mainboardAPI.growbeModules(id).get({}))
                )
              }
            } as SelectComponent,
          }
        }

        return [formProperty, subjectMainboard, subjectModule];
    };
}
