import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { unsubscriber } from '@berlingoqc/ngx-common';
import {
    DashboardGraphElement,
    GrowbeModuleWithRelations,
} from '@growbe2/ngx-cloud-api';
import { Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DashboardPanel } from '@growbe2/growbe-dashboard';
import {
    getModuleDefPropName,
    GrowbeModuleDefAPI,
} from '../../api/growbe-module-def';
import { growbeModuleDefForm } from '../component/growbe-module-def/growbe-module-def.form';
import { GrowbeModuleAPI } from '../../api/growbe-module';

export interface GrowbeModuleDashboardDef {
    haveSvg: boolean,
    haveAlarm: boolean,
    haveGraph: boolean,
    haveConfig: boolean,
    type: 'actor' | 'observer';
}

// CHANGER POUR TYPE MODULE POUR AVIR CONFIG BASÉ SUR ACTOR OR OBSERVER
export const growbeModuleDashboardDef: { [id: string]: GrowbeModuleDashboardDef } = {
    AAA: {
        haveSvg: true,
        haveAlarm: true,
        haveGraph: true,
        haveConfig: false,
        type: 'observer'
    },
    AAS: {
        haveSvg: true,
        haveAlarm: true,
        haveGraph: true,
        haveConfig: true,
        type: 'observer'
    },
    AAB: {
        haveSvg: false,
        haveAlarm: false,
        haveGraph: true,
        haveConfig: true,
        type: 'actor',
    },
    AAP: {
        haveSvg: false,
        haveAlarm: false,
        haveGraph: true,
        haveConfig: true,
        type: 'actor'
    },
    PPO: {
        haveAlarm: true,
        haveSvg: false,
        haveGraph: false,
        haveConfig: false,
        type: 'observer'
    },
    PPR: {
        haveAlarm: true,
        haveSvg: false,
        haveGraph: true,
        haveConfig: false,
        type: 'observer'
    },
    PAL: {
        haveAlarm: true,
        haveSvg: false,
        haveGraph: true,
        haveConfig: false,
        type: 'observer'
    },
    PAC: {
        haveAlarm: true,
        haveSvg: false,
        haveGraph: true,
        haveConfig: false,
        type: 'observer'
    },
    PCS: {
        haveAlarm: true,
        haveSvg: false,
        haveGraph: true,
        haveConfig: true,
        type: 'observer'
    },
    CCS: {
        haveAlarm: true,
        haveSvg: false,
        haveGraph: true,
        haveConfig: true,
        type: 'observer'
    },
    CSS: {
      haveAlarm: true,
      haveSvg: false,
      haveGraph: true,
      haveConfig: true,
      type: 'observer'
    }
};

@Component({
    selector: 'app-growbe-module-dashboard',
    templateUrl: './growbe-module-dashboard.component.html',
    styleUrls: ['./growbe-module-dashboard.component.scss'],
})
@unsubscriber
export class GrowbeModuleDashboardComponent implements OnInit {
    module: GrowbeModuleWithRelations;

    panel$: Observable<DashboardPanel>;

    subChartSelect: Subscription;

    interval = {
        lastX: 2,
        lastXUnit: 'Hours',
        liveUpdate: true,
        from: undefined,
        includeAlarms: undefined,
        to: undefined,
        grouping: undefined,
        oneChart: false,
        fields: [],
    };


    moduleDashboardDef: GrowbeModuleDashboardDef;
    currentChip: string;

    constructor(
        private activatedRoute: ActivatedRoute,
        private moduleAPI: GrowbeModuleAPI,
    ) { }

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.data.module) {
            this.module = this.activatedRoute.snapshot.data.module;
            this.moduleDashboardDef = growbeModuleDashboardDef[this.module.id.substring(0, 3)]
            if (this.moduleDashboardDef.type === 'actor') {
                this.setControlPanel();
            } else {
                this.setDataPanel();
            }
        }
    }

    setAlarmPanel() {
        this.currentChip = 'alarm';
        this.panel$ = this.injectPanelData((m, md) => this.getAlarms(m, md));
    }

    setGraphPanel() {
        this.currentChip = 'graph';
        this.panel$ = (this.getGraphPanel() as any) as Observable<DashboardPanel>;
    }

    setDataPanel() {
        this.currentChip = 'data';
        this.panel$ = this.injectPanelData((m, md) => this.getData(m, md))
    }

    setControlPanel() {
        this.currentChip = 'control';
        this.panel$ = this.injectPanelData((m, md) => this.getControl(m, md))
    }

    setConfigPanel() {
        this.currentChip = 'config';
        this.panel$ = this.injectPanelData((m, md) => this.getConfig(m, md))
    }

    setLogsPanel() {
        this.currentChip = 'logs';
        this.panel$ = this.injectPanelData((m, md) => this.getLogs(m, md));
    }

    private injectPanelData(f: (module, moduleDef) => any[]) {
        return this.moduleAPI.moduleDef(this.module.id)
            .get()
            .pipe(
                take(1),
                map((moduleDef) => {
                    this.subChartSelect?.unsubscribe();
                    return { items: f(module, moduleDef), name: '' };
                })
            )
    }

    private getGraphPanel() {
        return this.moduleAPI
            .moduleDef(this.module.id)
            .get()
            .pipe(
                map((moduleDef: any) => {
                    return {
                        name: 'graph',
                        class: ['grid'],
                        style: {
                            'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
                        },
                        items: [
                            {
                                name: `Graph Builder`,
                                component: 'graph-builder',
                                style: {
                                    'grid-column-start': '1',
                                    'grid-column-end': '6',
                                },
                                inputs: {
                                    module: this.module,
                                    mode: this.interval.from
                                        ? 'absolute'
                                        : 'relative',
                                    interval: this.interval,
                                },
                                outputs: {
                                    onRequest: (ts: Observable<any>) => {
                                        this.subChartSelect = ts.subscribe(
                                            (data) => {
                                                this.interval = data;
                                                this.setGraphPanel();
                                            },
                                        );
                                    },
                                },
                                copy: false,
                            },
                            ...this.getGraphItems(module, moduleDef),
                        ],
                    };
                }),
            );
    }

    private getConfig(module, moduleDef): any[] {
        return [
            {
                name:
                    this.module.id +
                    ` - ${moduleDef.displayName
                        ? moduleDef.displayName
                        : moduleDef.name
                    }`,
                component: 'growbe-module-def',
                inputs: {
                    moduleId: this.module.id,
                    mainboardId: this.module.mainboardId,
                },
                edit: growbeModuleDefForm(moduleDef, (data) => {
                    return this.moduleAPI
                        .moduleDef(this.module.id)
                        .updateById(moduleDef.id, data);
                }),
                style: {
                    'grid-column': '1/-2',
                },
            },
            ...(this.moduleDashboardDef.haveConfig ? ([{
                name: 'Module config',
                component: 'growbe-module-config',
                inputs: {
                    moduleId: this.module.id,
                    mainboardId: this.module.mainboardId,
                },
                style: {},
            }]) : []),
        ];
    }

    private getControl(module, moduleDef): any[] {
        return [
            {
                name: '',
                component: 'growbe-module-data-table',
                inputs: {
                        "mainboardId" : this.module.mainboardId,
                        "moduleId" : this.module.id,
                        "displayProperties" : Object.keys(moduleDef.properties),
                        "pageSize" : 1,
                        "disableTime": true,
                        "disablePaginator" : true,
                        "disableOptions" : true
                },
                style: {
                    "grid-column": "1/-1"
                },
            },
            ...Object.values(moduleDef.properties).map(
                (prop: any) => {

                    const [component, inputs] = [
                        'relay-unit-control',
                        {
                            mainboardId: this.module.mainboardId,
                            moduleId: this.module.id,
                            field: prop.name,
                        }
                    ];

                    return ({
                        name: moduleDef.properties[prop.name]
                            .displayName
                            ? moduleDef.properties[prop.name]
                                .displayName
                            : moduleDef.properties[prop.name].name,
                        component,
                        inputs,
                    });
                },
            ),
        ];
    }

    private getData(module, moduleDef): any[] {
        return [
            ...( this.moduleDashboardDef.haveSvg ? [{
                name: 'Module info',
                component: 'svg-module',
                inputs: {
                    moduleId: this.module.id,
                    mainboardId: this.module.mainboardId,
                },
                style: {
                    'max-width': '600px',
                },
            }] : []),
            {
                name: 'Values',
                component: 'growbe-module-last-value',
                inputs: {
                    graphDataConfig: {
                        fields: Object.keys(moduleDef.properties),
                        liveUpdate: true,
                        growbeId: this.module.mainboardId,
                        moduleId: this.module.id,
                    },
                }
            },

            ...( this.moduleDashboardDef.haveSvg ? [{
                name: 'Data of the last 24h',
                component: 'growbe-module-sensor-value-graph',
                inputs: {
                    "data" : {
                            "name" : "",
                            "type" : "graph",
                            "graphType" : "line",
                            "graphConfig" : {
                                "showLabels" : true,
                                "showXAxisLabel" : true,
                                "showYAxisLabel" : true,
                                "xAxis" : true,
                                "trimXAxisTicks" : true,
                                "yAxis" : true,
                                "xScaleMax": 80,
                                "xScaleMin": 10,
                            },
                            "graphDataConfig" : {
                                "fields" : Object.keys(moduleDef.properties),
                                "growbeId" : this.module.mainboardId,
                                "moduleId" : this.module.id,
                                "liveUpdate" : true,
                                "lastX" : 1,
                                "lastXUnit" : "Date",
                                "grouping" : {
                                    "intervalValue" : 1,
                                    "intervalUnit" : "minute",
                                    "baseGroup" : [
                                        "dayOfYear"
                                    ]
                                }
                            }
                        }
                },
                style: {
                    'grid-column': '1/-1',
                },
            }] : []),
            {
                name: 'Data historic',
                component: 'growbe-module-data-table',
                inputs: {
                    mainboardId: this.module.mainboardId,
                    moduleId: this.module.id,
                },
                style: {
                    'grid-column': '1/-1',
                },
            },
        ];
    }

    private getAlarms(module, moduleDef): any[] {
        const alarms = Object.values(moduleDef.properties)
                    .filter((md: any) => md.alarm)
                    .map((md: any) => md.alarm);
        return [
            {
                name: 'Module Alarm',
                component: 'growbe-alarm',
                inputs: {
                    mainboardId: this.module.mainboardId,
                    moduleId: this.module.id,
                },
                style: {
                    'grid-column': '1/-1',
                },
            },
            {
                name: 'Module Alarm event',
                component: 'logs-terminal',
                inputs: {
                    growbeId: this.module.mainboardId,
                    moduleId: this.module.id,
                    disableSearch: true,
                    where: {
                        growbeModuleId: this.module.id,
                        type: 'alarm',
                    },
                },
                style: {
                    'grid-column': '1/-1',
                },
            },
        ];
    }

    private getLogs(module, moduleDef): any[] {
        return [
             {
                name: 'Module Alarm event',
                component: 'logs-terminal',
                inputs: {
                    growbeId: this.module.mainboardId,
                    moduleId: this.module.id,
                    disableSearch: true,
                    where: {
                        growbeModuleId: this.module.id,
                    },
                },
                style: {
                    'grid-column': '1/-1',
                },
            },
        ];
    }

    private getGraphItems(module, moduleDef): any[] {
        if (this.interval.oneChart) {
            return [
                {
                    name: this.module.id,
                    component: 'growbe-module-sensor-value-graph',
                    inputs: {
                        data: {
                            name: '',
                            type: 'graph',
                            graphType: 'line',
                            graphConfig: {
                                showLabels: true,
                                showXAxisLabel: true,
                                showYAxisLabel: true,
                                xAxis: true,
                                trimXAxisTicks: true,
                                yAxis: true,
                                dateTickFormatting: (val: any) => {
                                    const date = new Date(val);
                                    return date.toLocaleString();
                                },
                                //yScaleMin: prop.operationalRange.min,
                                //yScaleMax: prop.operationalRange.max,
                            },
                            graphDataConfig: {
                                fields: this.interval.fields,
                                growbeId: this.module.mainboardId,
                                moduleId: this.module.id,
                                from: this.interval.from,
                                to: this.interval.to,
                                includeAlarms: this.interval.includeAlarms,
                                liveUpdate: this.interval.liveUpdate,
                                lastX: this.interval.lastX,
                                lastXUnit: this.interval.lastXUnit,
                                grouping: this.interval.grouping,
                            },
                        } as DashboardGraphElement,
                    },
                    style: {
                        'grid-column-start': '1',
                        'grid-column-end': '4',
                    },
                },
            ];
        } else {
            return Object.values(this.interval.fields).map((field) => {
                const prop = moduleDef.properties[field];
                return {
                    name: getModuleDefPropName(moduleDef, prop),
                    component: 'growbe-module-sensor-value-graph',
                    inputs: {
                        data: {
                            name: '',
                            type: 'graph',
                            graphType: 'line',
                            graphConfig: {
                                showLabels: true,
                                showXAxisLabel: true,
                                showYAxisLabel: true,
                                xAxis: true,
                                trimXAxisTicks: true,
                                yAxis: true,
                                dateTickFormatting: (val: any) => {
                                    const date = new Date(val);
                                    return date.toLocaleString();
                                },
                                yScaleMin: prop.operationalRange.min,
                                yScaleMax: prop.operationalRange.max,
                            },
                            graphDataConfig: {
                                fields: [prop.name],
                                growbeId: this.module.mainboardId,
                                moduleId: this.module.id,
                                from: this.interval.from,
                                to: this.interval.to,
                                liveUpdate: this.interval.liveUpdate,
                                includeAlarms: this.interval.includeAlarms,
                                lastX: this.interval.lastX,
                                lastXUnit: this.interval.lastXUnit,
                                grouping: this.interval.grouping,
                            },
                        } as DashboardGraphElement,
                    },
                    style: {
                        'grid-column-start': '1',
                        'grid-column-end': '4',
                    },
                };
            });
        }
    }

}
