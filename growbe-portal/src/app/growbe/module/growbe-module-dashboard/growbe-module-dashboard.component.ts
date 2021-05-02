import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardGraphElement, GrowbeModuleDef, GrowbeModuleWithRelations } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardPanel, ProjectDashboard } from 'src/app/dashboard/dashboard.model';
import { GrowbeModuleDefAPI } from '../../api/growbe-module-def';

@Component({
  selector: 'app-growbe-module-dashboard',
  templateUrl: './growbe-module-dashboard.component.html',
  styleUrls: ['./growbe-module-dashboard.component.scss']
})
export class GrowbeModuleDashboardComponent implements OnInit {
  module: GrowbeModuleWithRelations;

  panel$: Observable<DashboardPanel>;

  constructor(
     private activatedRoute: ActivatedRoute,
     private moduleDefAPI: GrowbeModuleDefAPI,
  ) { }

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
    return this.moduleDefAPI.getById(this.module.moduleName).pipe(map((moduleDef: GrowbeModuleDef) => {
      return {
        name: '',
        class: ['grid'],
        style: {
          'grid-template-columns': '1fr 1fr 1fr 1fr 1fr'
        },
        items: moduleDef.properties.map(prop => ({
          name: '',
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
                liveUpdate: true,
                lastX: 2,
                lastXUnit: 'Hours',
              }
            } as DashboardGraphElement,
          },
          style: {
                'grid-column-start': '1',
                'grid-column-end': '4'
          }
        })),
      }
    }));
  }

  private getRawPanel() {
    return this.moduleDefAPI.getById(this.module.moduleName).pipe(map((moduleDef: GrowbeModuleDef) => {
        return {
          name: '',
          class: ['grid'],
          style: {
            'grid-template-columns': '1fr 1fr 1fr 1fr 1fr'
          },
          items: [
            {
              name: '',
              component: 'growbe-module-def',
              inputs: {
                moduleDefId: this.module.moduleName,
              },
              style: {
                'grid-column-start': '1',
                'grid-column-end': '4'
              }
            },
            {
              name: '',
              component: 'growbe-module-state',
              inputs: {
                module: this.module,
              },
              style: {
                'grid-column-start': '4',
                'grid-column-end': '6'
              }
            },
            ...moduleDef.properties.map(prop => ({
              name: '',
              component: 'growbe-module-last-value',
              inputs: {
                data: {
                  graphDataConfig: {
                    fields: [prop.name],
                    liveUpdate: true,
                    growbeId: this.module.mainboardId,
                    moduleId: this.module.uid,
                  }
                }
              }
            })),
            {
              name: '',
              component: 'growbe-module-data-table',
              inputs: {
                module: this.module,
              },
              style: {
                'grid-column-start': '1',
                'grid-column-end': '6'
              }
            }
          ]
        }
      }));
  }



}
