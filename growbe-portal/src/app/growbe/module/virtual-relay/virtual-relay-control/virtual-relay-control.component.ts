import { Component, Input, OnInit } from '@angular/core';
import { GrowbeMainboardWithRelations, VirtualRelayWithRelations } from '@growbe2/ngx-cloud-api';
import { BaseDashboardComponent } from '@growbe2/growbe-dashboard';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, map, startWith, switchMap, take } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../../graph/service/growbe-graph.service';
import { RelayControl } from '../../relay/relay-base-control/relay-base-control.component';

@Component({
  selector: 'app-virtual-relay-control',
  templateUrl: './virtual-relay-control.component.html',
  styleUrls: ['./virtual-relay-control.component.scss']
})
export class VirtualRelayControlComponent extends BaseDashboardComponent implements OnInit {

  @Input() growbeId: string;
  @Input() vrId: string;

  control: RelayControl;


  mainboard: GrowbeMainboardWithRelations;

  private vrRefresh: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private mainboardAPI: GrowbeMainboardAPI,
    private graphService: GrowbeGraphService,
    private growbeEventService: GrowbeEventService,
  ) {
    super();
  }

  ngOnInit(): void {
    let obs_data = combineLatest([
      this.mainboardAPI.virtualRelays(this.growbeId).getById(this.vrId),
      this.getGrowbeModuleDataEventSource()
    ]);
    this.mainboardAPI.getById(this.growbeId).pipe(take(1)).subscribe((x) => this.mainboard = x);
    this.control = {
      changeManualState: (config) => this.mainboardAPI.virtualRelayUpdateConfig(this.growbeId, this.vrId, config, (this.mainboard?.growbeMainboardConfig?.config as any)?.preferedCommandConnnection == 1),
      getValues: () => this.vrRefresh.pipe(
        switchMap(() => obs_data),
        map(([vr, lastValue]: [any, any]) => {
          this.loadingEvent.next(null);
          return [vr.config, lastValue?.data?.state, lastValue?.endingAt, !vr.state] as any;
        }),
        catchError((err) => { this.loadingEvent.next({error: err}); throw err; }),
      ),
      refresh: () => {
        this.vrRefresh.next();
      }
    }
  }

  private getGrowbeModuleDataEventSource() {
     return this.graphService.getGraph(this.growbeId, 'one', {
       growbeId: this.growbeId,
       moduleId: this.vrId,
       fields: ["data"]
     }).pipe(
       switchMap((currentValue) => {
          return this.growbeEventService.getGrowbeEvent(
              this.growbeId,
              `/cloud/virtualrelay/${this.vrId}/data`,
              (d) => {
                let vr_state = JSON.parse(d);
                return { endingdAt: new Date(), data: vr_state.data};
              },
          ).pipe(
            startWith(currentValue[0])
          )
       })
     )
  }

}
