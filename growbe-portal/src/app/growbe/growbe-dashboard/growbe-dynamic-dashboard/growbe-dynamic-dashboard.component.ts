import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fuseAnimations, FuseSidebarService } from '@berlingoqc/fuse';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { Include, Where } from '@berlingoqc/ngx-loopback';
import { DashboardPanel } from 'src/app/dashboard/dashboard.model';
import { GrowbeWarningAPI } from '../../api/growbe-warning';

@Component({
    selector: 'app-growbe-dynamic-dashboard',
    templateUrl: './growbe-dynamic-dashboard.component.html',
    styleUrls: ['./growbe-dynamic-dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class GrowbeDynamicDashboardComponent implements OnInit {
    data: any;

    dashboardPanel: DashboardPanel[] = [{
      name: '1F54018 THL',
      grid: {
        cols: 2,
        rowHeight: '200px'
      },
      class: ['panel'],
      items: [
        {
          name: 'Historique des valeurs AAA000000003',
          component: 'growbe-module-data-table',
          class: ['table'],
          inputs: {
            module: {
              uid: 'AAA000000003',
              moduleName: 'AAA'
            }
          }
        },
        {
          name: 'Historique des valeurs AAS000000004',
          component: 'growbe-module-data-table',
          class: ['table'],
          inputs: {
            module: {
              uid: 'AAS000000004',
              moduleName: 'AAS'
            }
          }
        },
        {
          name: 'Dernière valeur AAA000000003 airTemperature',
          component: 'growbe-module-last-value',
          inputs: {
            data: {
              "name" : "Temperature",
              "type" : "lastread",
              "graphType" : "line",
              "graphDataConfig" : {
                  "growbeId" : "1F54018",
                  "moduleId" : "AAA000000003",
                  "lastX" : 2,
                  "liveUpdate" : true,
                  "fields" : [
                      "airTemperature"
                  ]
              }
            }
          }
        },
        {
          name: 'Graphique historique AAA000000003 humidity',
          component: 'growbe-module-sensor-value-graph',
          inputs: {
            data: {
              "name" : "Humidy",
              "type" : "graph",
              "graphType" : "line",
              "graphDataConfig" : {
                "growbeId" : "1F54018",
                "moduleId" : "AAA000000003",
                "lastX" : 2,
                "liveUpdate" : true,
                "fields" : [
                    "humidity"
                ]
              },
              "graphConfig" : {
                "legend" : true,
                "showLabels" : true,
                "xAxis" : true,
                "yAxis" : true,
                "showYAxisLabel" : true,
                "showXAxisLabel" : true,
                "xAxisLabel" : "Temps",
                "yAxisLabel" : "Humidity"
              }
            }
          }
        }
      ]
    }];

    constructor(
        private fuseSidebarService: FuseSidebarService,
        private activatedRoute: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.data = this.activatedRoute.snapshot.data.dashboard;
    }

    toggleSidebar(name): void {
        const sidebar = this.fuseSidebarService.getSidebar(name);
        sidebar.toggleOpen();
    }
}
