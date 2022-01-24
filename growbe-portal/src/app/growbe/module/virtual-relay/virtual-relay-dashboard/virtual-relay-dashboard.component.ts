import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardPanel } from 'projects/dashboard/src/public-api';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';

@Component({
  selector: 'app-virtual-relay-dashboard',
  templateUrl: './virtual-relay-dashboard.component.html',
  styleUrls: ['./virtual-relay-dashboard.component.scss']
})
export class VirtualRelayDashboardComponent implements OnInit {

  @Input() growbeId: string;
  
  panel$: Observable<DashboardPanel>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainboardAPI: GrowbeMainboardAPI,
  ) { }

  ngOnInit(): void {
    this.panel$ = this.getPanel();
  }


  add(): void {

  }

  private getPanel(): Observable<DashboardPanel> {
    return this.mainboardAPI.virtualRelays(this.growbeId).get().pipe(
      map((x) => {
        return {
          name: '',
          class: ['grid'],
          style: {
            'grid-template-columns': '1fr 1fr 1fr 1fr 1fr'
          },
          items: [
            ...(x.map(vr => {
              return {
                name: `VR Control ${vr.id}`,
                component: 'virtual-relay-control',
                style: {},
                inputs: {
                  growbeId: this.growbeId,
                  vrId: vr.id
                },
                outputs: {},
                copy: true,
              };
            })),
            {
              name: 'Virtual Relay table',
              component: 'virtual-relay-table',
              style: {
                'grid-column-start': '1',
                'grid-column-end': '6',
              },
              inputs: {
                growbeId: this.growbeId
              },
              outputs: {},
              copy: true,
            },
          ]
        }
      })
    )
  }

}
