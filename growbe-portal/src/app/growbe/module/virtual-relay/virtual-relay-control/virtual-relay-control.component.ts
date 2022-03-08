import { Component, Input, OnInit } from '@angular/core';
import { VirtualRelayWithRelations } from '@growbe2/ngx-cloud-api';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { GrowbeGraphService } from '../../graph/service/growbe-graph.service';
import { RelayControl } from '../../relay/relay-base-control/relay-base-control.component';

@Component({
  selector: 'app-virtual-relay-control',
  templateUrl: './virtual-relay-control.component.html',
  styleUrls: ['./virtual-relay-control.component.scss']
})
export class VirtualRelayControlComponent implements OnInit {

  @Input() growbeId: string;
  @Input() vrId: string;

  control: RelayControl;


  private vrRefresh: BehaviorSubject<void> = new BehaviorSubject(null);

  constructor(
    private mainboardAPI: GrowbeMainboardAPI,
    private graphService: GrowbeGraphService,
    private growbeEventService: GrowbeEventService,
  ) { }

  ngOnInit(): void {
    let obs_data = combineLatest([
      this.mainboardAPI.virtualRelays(this.growbeId).getById(this.vrId),
      this.getGrowbeModuleDataEventSource()
    ]);
    this.control = {
      changeManualState: (config) => this.mainboardAPI.virtualRelayUpdateConfig(this.growbeId, this.vrId, config),
      getValues: () => this.vrRefresh.pipe(
        switchMap(() => obs_data),
        map(([vr, lastValue]: [any, any]) => {
          return [vr.config, lastValue?.data?.state, lastValue?.endingAt, !vr.state];
        })
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
