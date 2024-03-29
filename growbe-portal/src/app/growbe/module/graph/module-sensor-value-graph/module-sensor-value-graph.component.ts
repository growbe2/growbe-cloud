import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { combineLatest, Subscription } from 'rxjs';
import { DashboardGraphElement } from '@growbe2/ngx-cloud-api';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { DatePipe } from '@angular/common';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { BaseDashboardComponent } from '@growbe2/growbe-dashboard';


@Component({
    selector: 'app-module-sensor-value-graph',
    templateUrl: './module-sensor-value-graph.component.html',
    styleUrls: ['./module-sensor-value-graph.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DatePipe]
})
export class ModuleSensorValueGraphComponent extends OnDestroyMixin(BaseDashboardComponent) implements OnInit, OnDestroy {
    @Input() data: DashboardGraphElement & { includeAlarms: boolean };

    chartSerie;

    sub: Subscription;

    get chart() {
        return this.data.graphConfig;
    }
    constructor(
        private datePipe: DatePipe,
        private graphService: GrowbeGraphService,
        private topic: GrowbeEventService,
        private changeDetection: ChangeDetectorRef,
        private growbeMainboardAPI: GrowbeMainboardAPI,
        private growbeModuleAPI: GrowbeModuleAPI,
    ) {
      super();
    }

    async ngOnInit() {
        this.data
        if (!this.data) {
            return;
        }
        if ((this.data.graphDataConfig as any).includeAlarms) {
          const relation = this.growbeMainboardAPI.hardwareAlarms(this.growbeMainboardAPI);
          relation.moduleId = this.data.graphDataConfig.moduleId;
          relation.get().subscribe((alarms) => {
            this.data.graphConfig.referenceLines = alarms.filter((v: any) => this.data.graphDataConfig.fields.includes(v.property)).flatMap((v: any) => {
              return [
                {
                  name: `${v.property}:low`,
                  value: v.low.value
                },
                {
                  name: `${v.property}:high`,
                  value: v.high.value
                }
              ];
            });
          });
        }
        combineLatest([
          this.growbeModuleAPI.moduleDef(this.data.graphDataConfig.moduleId).get(),
          this.graphService.getGraph(this.data.graphDataConfig.growbeId,this.data.type, this.data.graphDataConfig)
        ]).pipe(
          untilComponentDestroyed(this),
        ).subscribe(([def, series]: any) => {
          // rename serie name from property name to display name
          this.loadingEvent.next(null);
          series.forEach((serie) => {
            serie.property = serie.name;
            serie.name = def.properties[serie.name].displayName || serie.name;
          });
          this.chartSerie = series;
          this.changeDetection.markForCheck();
        }, (err) => {
          this.loadingEvent.next({error: err});
        });

        // TODO: fixe the issue of the timezone
        this.data.graphConfig['xAxisTickFormatting'] = (e) => {
          if (typeof e === 'string') {
            e = new Date(e.replace("Z", "+00:00"));
          }
          return this.datePipe.transform(e, 'HH:mm dd/MM');
        }

        // TODO : if agregation dont pull from mqtt put refresh periodically for new entries
        // depdending on the aggragation range
        if (this.data.graphDataConfig.liveUpdate) {
            this.sub = this.topic
                .getGrowbeEvent(
                    this.data.graphDataConfig.growbeId,
                    `/cloud/m/${this.data.graphDataConfig.moduleId}/data`,
                    (d) => JSON.parse(d),
                )
                .subscribe((data) => {
                    if (data && this.chartSerie) {
                        const serie = this.chartSerie;
                        for (const field of this.data.graphDataConfig.fields) {
                            const index = serie.findIndex(
                                (i) => i.property === field,
                            );
                            if (index === -1) {
                                continue;
                            }

                            const item = {
                                name: new Date().toLocaleString(),
                                value: data[field],
                            };
                            // fixe for zero value being remove from json object
                            if (!item.value) {
                              item.value = 0;
                            }
                            serie[index].series.splice(0, 1);
                            serie[index].series.push(item);
                        }
                        this.chartSerie = [...serie];
                        this.changeDetection.markForCheck();
                    }
                });
        }
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
