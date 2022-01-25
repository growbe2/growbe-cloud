import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { GrowbeModule } from 'growbe-cloud-api/lib';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../../graph/service/growbe-graph.service';
import { RelayControl } from '../relay-base-control/relay-base-control.component';

@Component({
  selector: 'app-relay-unit-control',
  templateUrl: './relay-unit-control.component.html',
  styleUrls: ['./relay-unit-control.component.scss']
})
export class RelayUnitControlComponent implements OnInit {
  @Input() mainboardId: string;
  @Input() moduleId: string;
  @Input() field: string;


  control: RelayControl;


  value$: Observable<any[]>;

  requestConfig: Subscription;

  constructor(
    private growbeModuleAPI: GrowbeModuleAPI,
    private graphService: GrowbeGraphService,
    private growbeActionAPI: GrowbeActionAPI,
    private growbeEventService: GrowbeEventService,
  ) { }

  async ngOnInit() {
    // faut que j'aille chercher la config et l'etat de cette propriétés
    this.control = {
     changeManualState: (state) => this.growbeActionAPI.executeActionModule('GROWBE_CONFIG_PROPERTY_UPDATE', this.mainboardId, this.moduleId, {
        property: this.field,
        config: {
          mode: 0,
          manual: { state: state }
        }
      }),
      getValues: () => combineLatest([
        this.growbeModuleAPI.getById(this.moduleId),
        this.growbeModuleAPI.moduleDef(this.moduleId).get(),
        this.getGrowbeModuleDataEventSource(),
      ]).pipe(
        map(([module, moduleDef, lastValue]: any) => {
          return [module.config[this.field], lastValue[this.field].state, lastValue.endingAt, true]
        }),
      )
    };
  }

  private getGrowbeModuleDataEventSource() {
     return this.graphService.getGraph(this.mainboardId, 'one', {
       growbeId: this.mainboardId,
       moduleId: this.moduleId,
       fields: [this.field]
     }).pipe(
       switchMap((currentValue) => {
          return this.growbeEventService.getGrowbeEvent(
              this.mainboardId,
              `/cloud/m/${this.moduleId}/data`,
              (d) => {
                console.log('RECEIVE FROM MQTT');
                return Object.assign(JSON.parse(d), { endingdAt: new Date()})
              },
          ).pipe(
            startWith(currentValue[0])
          )
       })
     )
  }

}
