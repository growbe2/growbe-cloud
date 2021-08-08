import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { unsubscriber } from '@berlingoqc/ngx-common';
import {
    DashboardGraphElement,
    GrowbeModuleDefWithRelations,
    GrowbeModuleWithRelations,
} from '@growbe2/ngx-cloud-api';
import { Observable, of, Subscription } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { DashboardPanel, ProjectDashboard } from '@growbe2/growbe-dashboard';
import {
    getModuleDefPropName,
    GrowbeModuleDefAPI,
} from '../../api/growbe-module-def';
import { growbeModuleDefForm } from '../component/growbe-module-def/growbe-module-def.form';
import { moduleDefPropertyDisplayer } from '../module.def';
import { GrowbeModuleAPI } from '../../api/growbe-module';
import { StaticDataSource } from '@berlingoqc/ngx-loopback';
import { hardwareAlarmColumns } from '../hardware-alarm/hardware-alarm.table';
import { getHardwareAlarmForm } from '../hardware-alarm/hardware-alarm.form';

function getReferenceLineForAlarmZone(name: string, zone: any, referenceLines: any[]) {
    if (zone.value) {
        if (zone.offset) {
            referenceLines.push({
                name: '',
                value: zone.value - zone.offset,
            });
            referenceLines.push({
                name,
                value: zone.value + zone.offset,
            });
        } else {
            referenceLines.push({ name, value: zone.value });
        }
    }
}

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
        to: undefined,
        grouping: undefined,
        fields: [],
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private moduleDefAPI: GrowbeModuleDefAPI,
        private moduleAPI: GrowbeModuleAPI,
    ) {}

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.data.module) {
            this.module = this.activatedRoute.snapshot.data.module;
            this.panel$ = this.getRawPanel()  as any as Observable<DashboardPanel>;
        }
    }

    setRawPanel() {
        this.panel$ = this.getRawPanel() as any as Observable<DashboardPanel>;
    }

    setGraphPanel() {
        this.panel$ = this.getGraphPanel()  as any as Observable<DashboardPanel>;
    }

    private getGraphPanel() {
        return this.moduleAPI.moduleDef(this.module.id).get().pipe(
            map((moduleDef: any) => ({
                name: '',
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
                            mode: this.interval.from ? 'absolute' : 'relative',
                            interval: this.interval,
                        },
                        outputs: {
                            onRequest: (ts: Observable<any>) => {
                                this.subChartSelect = ts.subscribe((data) => {
                                    this.interval = data;
                                    this.setGraphPanel();
                                });
                            },
                        },
                        copy: false,
                    },
                    ...Object.values(this.interval.fields).map((field) => {
                        const prop = moduleDef.properties[field];
                        const referenceLines = [];
                        if (prop.alarm) {
                          getReferenceLineForAlarmZone('Low', prop.alarm.low, referenceLines);
                          getReferenceLineForAlarmZone('High', prop.alarm.high, referenceLines);
                        }
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
                                        referenceLines,
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
                    }),
                ],
            })),
        );
    }

    private getRawPanel() {
        if (this.subChartSelect) {
            this.subChartSelect.unsubscribe();
        }
        return this.moduleAPI.moduleDef(this.module.id).get().pipe(
            map((moduleDef: any) => {
                const alarms = Object.values(moduleDef.properties)
                    .filter((md: any) => md.alarm)
                    .map((md: any) => md.alarm);
                return {
                    name: '',
                    class: ['grid'],
                    style: {
                        'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
                    },
                    items: [
                        {
                            name:
                                this.module.id +
                                ` - ${
                                    moduleDef.displayName
                                        ? moduleDef.displayName
                                        : moduleDef.name
                                }`,
                            component: 'growbe-module-def',
                            inputs: {
                                moduleDefId: this.module.id,
                            },
                            edit: growbeModuleDefForm(moduleDef, (data) => {
                                    return this.moduleAPI.moduleDef(this.module.id).updateById(
                                        moduleDef.id,
                                        data,
                                    );
                            }),
                            style: {
                                'grid-column-start': '1',
                                'grid-column-end': '4',
                            },
                        },
                        {
                            name: 'Module config',
                            component: 'growbe-module-config',
                            inputs: {
                                moduleId: this.module.id,
                            },
                            style: {
                                'grid-column-start': '4',
                                'grid-column-end': '6',
                            },
                        },
                        {
                            name: 'Module info',
                            component:
                                this.module.id.substring(0, 3) +
                                '-module',
                            inputs: {
                                module: this.module,
                                moduleDef: moduleDef,
                            },
                            style: {
                                'grid-column-start': '1',
                                'grid-column-end': '6',
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
                                    growbwModuleId: this.module.id,
                                    type: 'alarm',
                                },
                            },
                            style: {
                                'grid-column-start': '1',
                                'grid-column-end': '6',
                            },
                        },
                        {
                            name: 'Module Alarm',
                            component: 'growbe-alarm',
                            inputs: {
                                columns: hardwareAlarmColumns,
                                source: new StaticDataSource(alarms),
                                formData: getHardwareAlarmForm(
                                    Object.assign(this.module, { moduleDef }),
                                    alarms.map((a) => a.property),
                                    this.moduleDefAPI,
                                ),
                                removeElement: (element) =>
                                    this.moduleDefAPI.removeAlarm(
                                        this.module.mainboardId,
                                        element,
                                    ),
                            },
                            style: {
                                'grid-column-start': '1',
                                'grid-column-end': '6',
                            },
                        },
                        ...Object.values(moduleDef.properties).map((prop: any) => ({
                            name: moduleDef.properties[prop.name].displayName
                                ? moduleDef.properties[prop.name].displayName
                                : moduleDef.properties[prop.name].name,
                            component: 'growbe-module-last-value',
                            inputs: {
                                data: {
                                    graphDataConfig: {
                                        fields: [prop.name],
                                        liveUpdate: true,
                                        growbeId: this.module.mainboardId,
                                        moduleId: this.module.id,
                                    },
                                },
                                moduleType: this.module.id.slice(0, 3),
                            },
                        })),
                        {
                            name: 'Data historic',
                            component: 'growbe-module-data-table',
                            inputs: {
                                module: this.module,
                            },
                            style: {
                                'grid-column-start': '1',
                                'grid-column-end': '6',
                            },
                        },
                    ],
                };
            }),
        );
    }
}
