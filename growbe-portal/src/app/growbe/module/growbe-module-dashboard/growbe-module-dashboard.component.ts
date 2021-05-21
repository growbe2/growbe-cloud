import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { unsubscriber } from '@berlingoqc/ngx-common';
import {
    DashboardGraphElement,
    GrowbeModuleDef,
    GrowbeModuleWithRelations,
} from '@growbe2/ngx-cloud-api';
import { Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DashboardPanel, ProjectDashboard } from '@growbe2/growbe-dashboard';
import { GrowbeModuleDefAPI } from '../../api/growbe-module-def';
import { growbeModuleDefForm } from '../component/growbe-module-def/growbe-module-def.form';

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
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private moduleDefAPI: GrowbeModuleDefAPI,
    ) {}

    ngOnInit(): void {
        if (this.activatedRoute.snapshot.data.module) {
            this.module = this.activatedRoute.snapshot.data.module;
            this.panel$ = this.getRawPanel();
        }
    }

    setRawPanel() {
        this.panel$ = this.getRawPanel();
    }

    setGraphPanel() {
        this.panel$ = this.getGraphPanel();
    }

    private getGraphPanel() {
        return this.moduleDefAPI.getById(this.module.moduleName).pipe(
            map((moduleDef: GrowbeModuleDef) => ({
                name: '',
                class: ['grid'],
                style: {
                    'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
                },
                items: [
                    {
                        name: '',
                        component: 'timeframe-select',
                        style: {
                            'grid-column-start': '1',
                            'grid-column-end': '6',
                        },
                        inputs: {
                            mode: this.interval.from ? 'absolute' : 'relative',
                            interval: this.interval,
                        },
                        outputs: {
                            timeSelected: (ts: Observable<any>) => {
                                this.subChartSelect = ts.subscribe((data) => {
                                    this.interval = data;
                                    this.setGraphPanel();
                                });
                            },
                        },
                        copy: false,
                    },
                    ...Object.values(moduleDef.properties).map((prop) => ({
                        name: moduleDef.properties[prop.name].displayName,
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
                                    yAxis: true,
                                    yScaleMin: prop.operationalRange.min,
                                    yScaleMax: prop.operationalRange.max,
                                },
                                graphDataConfig: {
                                    fields: [prop.name],
                                    growbeId: this.module.mainboardId,
                                    moduleId: this.module.uid,
                                    from: this.interval.from,
                                    to: this.interval.to,
                                    liveUpdate: this.interval.liveUpdate,
                                    lastX: this.interval.lastX,
                                    lastXUnit: this.interval.lastXUnit,
                                },
                            } as DashboardGraphElement,
                        },
                        style: {
                            'grid-column-start': '1',
                            'grid-column-end': '4',
                        },
                    })),
                ],
            })),
        );
    }

    private getRawPanel() {
        if (this.subChartSelect) {
            this.subChartSelect.unsubscribe();
        }
        return this.moduleDefAPI.getById(this.module.moduleName).pipe(
            map((moduleDef: GrowbeModuleDef) => ({
                name: '',
                class: ['grid'],
                style: {
                    'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
                },
                items: [
                    {
                        name: '',
                        component: 'growbe-module-def',
                        inputs: {
                            moduleDefId: this.module.moduleName,
                        },
                        edit: growbeModuleDefForm(moduleDef, (data) => {
                          return this.moduleDefAPI.updateById(this.module.moduleName, data);
                        }),
                        style: {
                            'grid-column-start': '1',
                            'grid-column-end': '4',
                        },
                    },
                    {
                        name: '',
                        component: 'growbe-module-state',
                        inputs: {
                            module: this.module,
                        },
                        style: {
                            'grid-column-start': '4',
                            'grid-column-end': '6',
                        },
                    },
                    ...Object.values(moduleDef.properties).map((prop) => ({
                        name: (moduleDef.properties[prop.name].displayName) ? (moduleDef.properties[prop.name].displayName) : moduleDef.properties[prop.name].name,
                        component: 'growbe-module-last-value',
                        inputs: {
                            data: {
                                graphDataConfig: {
                                    fields: [prop.name],
                                    liveUpdate: true,
                                    growbeId: this.module.mainboardId,
                                    moduleId: this.module.uid,
                                },
                            },
                        },
                    })),
                    {
                        name: '',
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
            })),
        );
    }
}
