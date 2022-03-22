import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../service/growbe-graph.service';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import {
  GraphModuleRequest,
  GrowbeModuleDefWithRelations,
} from '@growbe2/ngx-cloud-api';
import { DecimalPipe } from '@angular/common';
import { transformModuleValue } from '../../module.def';
import { map } from 'rxjs/operators';

/*

Fixer probleme si on fetch pas le valuetype pour le soil
Fixe value qui marque la diff si il a pas de value
Fixe probleme with empty value (maybe should be more fixe in the library not tolerating empty item in the array)
 */

@Component({
    selector: 'app-module-last-value',
    templateUrl: './module-last-value.component.html',
    styleUrls: ['./module-last-value.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DecimalPipe],
})
export class ModuleLastValueComponent implements OnInit, OnDestroy {
    @Input() graphDataConfig: GraphModuleRequest;


    get moduleType(): string {
      return this.graphDataConfig.moduleId.slice(0, 3);
    }
    sub: Subscription;

    moduleDef: Observable<GrowbeModuleDefWithRelations>;

    contentDisplays: any[];

    valueObject: any;
    value: any;
    lastValue: any;

    at: Date;
    historic: number[] = [];

    connected: Observable<boolean>;

    constructor(
        private topic: GrowbeEventService,
        private graphService: GrowbeGraphService,
        private changeDetection: ChangeDetectorRef,
        private moduleAPI: GrowbeModuleAPI,
        private numberPipe: DecimalPipe,
    ) {}

    ngOnInit(): void {
        if (!this.graphDataConfig) {
            return;
        }

        this.connected = this.topic.getModuleLive(this.graphDataConfig.growbeId, this.graphDataConfig.moduleId).pipe(
          map((item) => item.connected)
        );

        this.contentDisplays = this.graphDataConfig.fields.map((field) => transformModuleValue(
          this.moduleType,
          field
        ).content);


        const sendingGraphdata = {...this.graphDataConfig};
        sendingGraphdata.fields.push('valuetype')
        this.graphService
            .getGraph(this.graphDataConfig.growbeId, 'one', sendingGraphdata)
            .subscribe(async (data: any) => {
                if (data.length === 0) {
                  return;
                }
                data = data[0];
                this.moduleDef = this.moduleAPI
                  .moduleDef(this.graphDataConfig.moduleId)
                  .get() as any;


                this.valueObject = {
                  values: data
                };

                this.at = data.createdAt;
                this.changeDetection.markForCheck();
                if (this.graphDataConfig.liveUpdate) {
                    this.sub = (
                        await this.topic.getGrowbeEvent(
                            this.graphDataConfig.growbeId,
                            `/cloud/m/${this.graphDataConfig.moduleId}/fdata`,
                            (d) =>
                                Object.assign(JSON.parse(d), {
                                    createdAt: new Date(),
                                }),
                        )
                    ).subscribe((graphData) => {
                        if (graphData) {
                            this.lastValue = this.valueObject.values;
                            this.historic.push(this.lastValue);
                            this.valueObject = graphData;
                            this.value = this.valueObject.values;
                            this.at = graphData.createdAt;
                            this.changeDetection.markForCheck();
                        }
                    });
                }
            });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    private transformValue(value) {
        value = transformModuleValue(this.moduleType, value);
        if (typeof value === 'number') {
            value = this.numberPipe.transform(value);
        }
        return value;
    }
}
