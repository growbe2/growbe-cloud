import { Inject, inject, Injectable, Injector } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AuthService } from '@berlingoqc/auth';
import {
    ArrayProperty,
    DictionnayProperty,
    FormObject,
    IProperty,
    SelectComponent,
} from '@berlingoqc/ngx-autoform';
import { envConfig } from '@berlingoqc/ngx-common';
import {
    DashboardRegistryItem,
    DashboardRegistryService,
} from '@growbe2/growbe-dashboard';
import { Dashboard } from '@growbe2/growbe-dashboard';
import { BehaviorSubject, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { ModuleSensorValueGraphComponent } from 'src/app/growbe/module/graph/module-sensor-value-graph/module-sensor-value-graph.component';
import { StreamPlayerComponent } from 'src/app/growbe/video-stream/stream-player/stream-player.component';
import {getCloudLogSearchForm} from 'src/app/shared/terminal/cloud-log-search.form';
import {getTerminalComponentInputForm} from 'src/app/shared/terminal/terminal-component.form';
import {
    TerminalComponent,
} from 'src/app/shared/terminal/terminal/terminal.component';
import { GrowbeStreamAPI } from '../api/growbe-stream';
import { GrowbeStateComponent } from '../growbe-mainboard/component/growbe-state/growbe-state.component';
import { GrowbeModuleConfigComponent } from '../module/component/growbe-module-config/growbe-module-config.component';
import { GrowbeModuleDataTableComponent } from '../module/component/growbe-module-data-table/growbe-module-data-table.component';
import { GrowbeModuleDefComponent } from '../module/component/growbe-module-def/growbe-module-def.component';
import { ModuleStatusDotComponent } from '../module/component/module-status-dot/module-status-dot.component';
import { ModuleGraphBuilderComponent } from '../module/graph/module-graph-builder/module-graph-builder.component';
import { ModuleLastValueComponent } from '../module/graph/module-last-value/module-last-value.component';
import { GrowbeGraphService } from '../module/graph/service/growbe-graph.service';
import { HardwareAlarmTableComponent } from '../module/hardware-alarm/hardware-alarm-table.component';
import { RelayUnitControlComponent } from '../module/relay/relay-unit-control/relay-unit-control.component';
import { ModuleSVGComponent } from '../module/svg/module-svg.component';
import { VirtualRelayControlComponent } from '../module/virtual-relay/virtual-relay-control/virtual-relay-control.component';
import { VirtualRelayTableComponent } from '../module/virtual-relay/virtual-relay-table/virtual-relay-table.component';
import { DashboardWelcomeComponent } from './component/dashboard-welcome/dashboard-welcome.component';

@Injectable({
    providedIn: 'root',
})
export class GrowbeDashboardRegistry implements DashboardRegistryService {
    items: { [id: string]: DashboardRegistryItem } = {};

    constructor(
        private mainboardAPI: GrowbeMainboardAPI,
        private authService: AuthService,
        private graphService: GrowbeGraphService,
        private streamAPI: GrowbeStreamAPI,
    ) {
        [
            {
                name: '',
                component: 'growbe-welcome',
                componentType: DashboardWelcomeComponent,
                inputs: {},
            },
            {
                name: '',
                component: 'growbe-module-data-table',
                componentType: GrowbeModuleDataTableComponent,
                inputs: {
                    ...this.getModulePropertyList(),
                    ...this.getTableConfig(),
                },
            },
            {
                name: '',
                component: 'growbe-module-sensor-value-graph',
                componentType: ModuleSensorValueGraphComponent,
                inputs: {
                    ...this.getGraphModuleRequestProperty([
                        {
                            name: 'includeAlarms',
                            displayName: 'Include alarms as reference lines',
                            type: 'bool',
                            component: {
                                name: 'checkbox',
                            },
                        },
                    ]),
                },
            },
            {
                name: '',
                component: 'growbe-module-last-value',
                componentType: ModuleLastValueComponent,
                inputs: {
                    ...this.getLatestValueModuleRequestProperty(),
                },
            },
            {
                name: '',
                component: 'growbe-state',
                componentType: GrowbeStateComponent,
                inputs: {
                    ...this.getDashboardAndModuleProperty(false)[0],
                },
            },
            {
                name: '',
                component: 'growbe-module-def',
                componentType: GrowbeModuleDefComponent,
                inputs: {
                    ...this.getDashboardAndModuleProperty(true)[0],
                },
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
                componentType: HardwareAlarmTableComponent,
                inputs: {
                    ...this.getDashboardAndModuleProperty(true)[0],
                },
            },
            {
                name: '',
                component: 'growbe-module-config',
                description: '',
                componentType: GrowbeModuleConfigComponent,
                inputs: {
                    ...this.getDashboardAndModuleProperty(true)[0],
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
                inputs: {
                  ...getTerminalComponentInputForm()
                },
            },
            {
                name: '',
                component: 'video-stream',
                componentType: StreamPlayerComponent,
                inputs: this.getVideoStreamInput(),
            },
            {
                name: '',
                component: 'svg-module',
                componentType: ModuleSVGComponent,
                inputs: {
                    ...this.getDashboardAndModuleProperty(true)[0],
                },
                outputs: {},
            },
            {
                name: '',
                component: 'relay-unit-control',
                componentType: RelayUnitControlComponent,
                inputs: {
                    ...this.getModuleProperty('mainboardId', ['AAP', 'AAB']),
                },
                outputs: {},
            },
            {
                name: '',
                component: 'virtual-relay-table',
                componentType: VirtualRelayTableComponent,
                inputs: {},
                outputs: {},
            },
            {
                name: '',
                component: 'virtual-relay-control',
                componentType: VirtualRelayControlComponent,
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

    private getVideoStreamInput() {
        const mainboard = this.getDashboardAndModuleProperty(
            false,
            'mainboardId',
            false,
        );
        return {
            ...mainboard[0],
            streamNames: {
                type: 'array',
                name: 'streamNames',
                elementType: {
                    type: 'string',
                    name: '',
                    component: {
                        name: 'select',
                        type: 'mat',
                        transformValue: (e) => e.streamName,
                        options: {
                            displayContent: (e) => e.streamName,
                            value: () =>
                                mainboard[1].pipe(
                                    switchMap((x) =>
                                        this.streamAPI.getLiveStreams(x),
                                    ),
                                ),
                        },
                        compareWith: (a, b) => a === b,
                    } as SelectComponent,
                },
            } as ArrayProperty,
            showMultiple: {
                type: 'bool',
                name: 'showMultiple',
                component: {
                  name: 'checkbox'
                }
            },
            mute: {
                type: 'bool',
                name: 'mute',
                component: {
                    name: 'checkbox',
                },
            },
        };
    }

    private getTableConfig = () => {
        return {
            //enablePagination: true,
            pageSize: {
                type: 'number',
                name: 'pageSize',
            },
            disablePaginator: {
                type: 'bool',
                name: 'disablePaginator',
                component: {
                    name: 'checkbox',
                },
            },
            disableOptions: {
                type: 'bool',
                name: 'disableOptions',
                component: {
                    name: 'checkbox',
                },
            },
        };
    };

    private getModulePropertyList = () => {
        const [
            formMM,
            subjectMainboard,
            subjectModule,
        ] = this.getDashboardAndModuleProperty(true, 'mainboardId');

        return {
            mainboardId: formMM['mainboardId'],
            moduleId: formMM['moduleId'],
            displayProperties: this.graphService.getPropertySelectForm(
                subjectModule.asObservable(),
                'displayProperties',
            ),
        };
    };

    private getModuleProperty = (idName: string, moduleType?: string[]) => {
        const [
            formMM,
            subjectMainboard,
            subjectModule,
        ] = this.getDashboardAndModuleProperty(true, idName, false, moduleType);

        return {
            [idName]: formMM[idName],
            moduleId: formMM['moduleId'],
            field: this.graphService.getPropertySelectFormElement(
                subjectModule.asObservable(),
                'field',
            ),
        };
    };

    private getGraphModuleRequestProperty = (extra?: IProperty[]) => {
        const [
            formMM,
            subjectMainboard,
            subjectModule,
        ] = this.getDashboardAndModuleProperty(true, 'growbeId');

        const formTimeFrame = this.graphService.getGraphTimeFrameSelectForm(
            subjectModule.asObservable(),
            undefined,
            undefined,
            extra,
            true,
        );
        return {
            data: {
                type: 'object',
                name: 'data',
                properties: [
                    {
                        type: 'string',
                        name: 'type',
                        component: {
                            name: 'select',
                            transformValue: (e) => e,
                            options: {
                                displayContent: (e) => e,
                                value: of(['graph']),
                            },
                        } as SelectComponent,
                    },
                    {
                        type: 'string',
                        name: 'graphType',
                        component: {
                            name: 'select',
                            transformValue: (e) => e,
                            options: {
                                displayContent: (e) => e,
                                value: () => of(['line']),
                            },
                        } as SelectComponent,
                    },
                    {
                        name: 'graphDataConfig',
                        type: 'object',
                        properties: [
                            formMM['growbeId'],
                            formMM['moduleId'],
                            ...formTimeFrame,
                        ],
                    } as FormObject,
                    {
                        name: 'graphConfig',
                        type: 'dic',
                        availableProperty: [
                            {
                                name: 'showLabels',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'showXAxisLabel',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'showYAxisLabel',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'trimXAxisTicks',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'xAxis',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'yAxis',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'yScaleMax',
                                type: 'number',
                            },
                            {
                                name: 'yScaleMin',
                                type: 'number',
                            },
                            {
                                name: 'legend',
                                type: 'bool',
                                component: {
                                    name: 'checkbox',
                                },
                            },
                            {
                                name: 'legendTitle',
                                type: 'string',
                            },
                            {
                                name: 'legendPosition',
                                type: 'string',
                                component: {
                                    name: 'select',
                                    transformValue: (e) => e,
                                    options: {
                                        displayContent: (e) => e,
                                        value: of(['right', 'below']),
                                    },
                                } as SelectComponent,
                            },
                        ],
                    } as DictionnayProperty,
                ],
            } as FormObject,
        };
    };

    private getLatestValueModuleRequestProperty = () => {
        const [formMM, _, subjectModule] = this.getDashboardAndModuleProperty(
            true,
            'growbeId',
        );

        const form = {
            graphDataConfig: {
                name: 'graphDataConfig',
                type: 'object',
                required: true,
                properties: [
                    formMM['growbeId'],
                    formMM['moduleId'],
                    ...this.graphService.getGraphTimeFrameSelectForm(
                        subjectModule,
                        undefined,
                        true,
                        undefined,
                        false,
                    ),
                ],
            } as FormObject,
        };
        return form;
    };

    private getDashboardAndModuleProperty = (
        includeModule: boolean,
        mainboardPropertyName = 'mainboardId',
        optionalModuleId = false,
        moduleType: string[] = undefined,
    ): [
        { [id: string]: IProperty },
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
                moduleControl?.enable();
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
                            .userGrowbeMainboard(this.authService.profile.id)
                            .get({}),
                },
            } as SelectComponent,
        };

        if (includeModule) {
            formProperty['moduleId'] = {
                name: 'moduleId',
                type: 'string',
                required: !optionalModuleId,
                initialize: (control) => {
                    moduleControl = control as any;
                    if (!control.value && !lastMainboarId) {
                        control.disable();
                    } else {
                        subjectModule.next(control.value);
                    }
                },
                valuesChanges: (control, value) => {
                    subjectModule.next(value);
                },
                component: {
                    name: 'select',
                    type: 'mat',
                    compareWith: (a, b) => {
                        return a === b;
                    },
                    transformValue: (e) => e.id,
                    options: {
                        displayTitle: 'Module',
                        displayContent: (e) => e.moduleDef.displayName || e.id,
                        value: () =>
                            subjectMainboard.pipe(
                                filter((id) => id),
                                switchMap((id) =>
                                    this.mainboardAPI
                                        .growbeModules(id)
                                        .get({
                                            include: [
                                                { relation: 'moduleDef' },
                                            ],
                                        })
                                        .pipe(
                                            map((item) => {
                                                if (moduleType) {
                                                    return item.filter(
                                                        (x) =>
                                                            moduleType.indexOf(
                                                                x.id.slice(
                                                                    0,
                                                                    3,
                                                                ),
                                                            ) > -1,
                                                    );
                                                }
                                                return item;
                                            }),
                                        ),
                                ),
                            ),
                    },
                } as SelectComponent,
            };
        }

        return [formProperty, subjectMainboard, subjectModule];
    };

    modifyDashboardForDisplay(dashboard: Dashboard) {
        dashboard.panels.forEach((panel) => {
            panel.items.forEach((item) => {
                item.dashboardEdit = true;
            });
        });
        return dashboard;
    }
}
