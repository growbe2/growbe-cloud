import { Component, Input, OnInit } from '@angular/core';
import { GrowbeMainboardWithRelations, GrowbeModule, GrowbeSensorValue } from '@growbe2/ngx-cloud-api';
import { BaseDashboardComponent } from 'projects/dashboard/src/public-api';
import { combineLatest, Observable, of, Subscription, from } from 'rxjs';
import { catchError, map, startWith, switchMap, tap } from 'rxjs/operators';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import {GrowbeMainboardAPI} from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { mapTextForMode, RelayControl } from '../relay-base-control/relay-base-control.component';

@Component({
  selector: 'app-relay-unit-control',
  templateUrl: './relay-unit-control.component.html',
  styleUrls: ['./relay-unit-control.component.scss']
})
export class RelayUnitControlComponent extends BaseDashboardComponent implements OnInit {
  @Input() mainboardId: string;
  @Input() moduleId: string;
  @Input() field: string;

  control: RelayControl;

  value$: Observable<any[]>;

  requestConfig: Subscription;

  constructor(
    private growbeMainboardAPI: GrowbeMainboardAPI,
    private growbeModuleAPI: GrowbeModuleAPI,
    private growbeActionAPI: GrowbeActionAPI,
    private growbeEventService: GrowbeEventService,
  ) {
    super();
    this.growbeModuleAPI.flushSensorValue(this.moduleId);
  }

  async ngOnInit() {
    if (this.growbeModuleAPI.requestGet.items[this.moduleId]) {
      this.growbeModuleAPI.requestGet.items[this.moduleId].subject.next(null);
    }


    /*
    this.control = {
     changeManualState: (config) => {
       return this.growbeMainboardAPI.getById(this.mainboardId).pipe(switchMap((x: GrowbeMainboardWithRelations) => { return this.growbeActionAPI.executeActionModule('GROWBE_CONFIG_PROPERTY_UPDATE', this.mainboardId, this.moduleId, {
        property: this.field,
        config: config,
      }, {
        disableSuccess: config.mode === 0,
        title: (config.mode === 0) ? '' : mapTextForMode[config.mode].created,
      }, (x.growbeMainboardConfig?.config as any)?.preferedCommandConnnection == 1);}))
      },
      getValues: () => combineLatest([
        this.growbeEventService.getModuleLive(this.mainboardId, this.moduleId).pipe(tap(() => console.log('from module live'))),
        this.growbeModuleAPI.moduleDef(this.moduleId).get().pipe(tap(() => console.log('from module def'))),
        this.getGrowbeModuleDataEventSource().pipe(tap(() => console.log('from event data'))),
      ]).pipe(
        map(([module, moduleDef, lastValue]: any) => {
          this.loadingEvent.next(null);
          return [module.config[this.field], lastValue[this.field].state, lastValue.endingAt, !module.connected] as any;
        }),
        catchError((err) => {
          this.loadingEvent.next({error: err});
          throw err;
        }),
      ),
      refresh: () => {
        this.growbeModuleAPI.requestFind
            .onModif(of(null))
            .subscribe();
      }
    };
    */
  }

  private getGrowbeModuleDataEventSource() {
     return this.growbeModuleAPI.growbeSensorValues(this.moduleId).get({
       limit: 1,
       order: ['createdAt DESC']
     }).pipe(
       switchMap((currentValue: GrowbeSensorValue) => {
          return this.growbeEventService.getGrowbeEvent(
              this.mainboardId,
              `/cloud/m/${this.moduleId}/data`,
              (d) => {
                return Object.assign(JSON.parse(d), { endingdAt: new Date()})
              },
          ).pipe(
            startWith(currentValue[0].values)
          )
       })
     )
  }

}
