import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoFormDialogService } from '@berlingoqc/ngx-autoform';
import { notify } from '@berlingoqc/ngx-notification';
import { DashboardPanel } from 'projects/dashboard/src/public-api';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { getCreateVirtualRelayForm } from '../forms';

@Component({
  selector: 'app-virtual-relay-dashboard',
  templateUrl: './virtual-relay-dashboard.component.html',
  styleUrls: ['./virtual-relay-dashboard.component.scss']
})
export class VirtualRelayDashboardComponent implements OnInit {

  @Input() set growbeId(growbeId: string) {
    this._growbeId = growbeId;
    this.panelControls$ = this.getPanelControl();
    this.panelTable = this.getPanelTable();
  }

  get growbeId(): string {
    return this._growbeId;
  }

  _growbeId: string;

  panelControls$: Observable<DashboardPanel>;
  panelTable: DashboardPanel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private mainboardAPI: GrowbeMainboardAPI,
    private formDialog: AutoFormDialogService,
  ) { }

  ngOnInit(): void {}

  add(): void {
    getCreateVirtualRelayForm(this.growbeId, this.mainboardAPI.growbeModules(this.growbeId), this.mainboardAPI.virtualRelays(this.growbeId)).pipe(
      switchMap((formData) => this.formDialog.open(formData).afterClosed()),
      filter(x => x),
      notify({
        title: 'Virtual relay created',
        titleFailed: 'Failed to create the virtual relay',
        body: () => '',
      }),
    ).subscribe();
  }

  private getPanelControl(): Observable<DashboardPanel> {
    return this.mainboardAPI.virtualRelays(this.growbeId).get().pipe(
      map((x) => {
        return {
          name: '',
          class: ['grid'],
          style: {
            'grid-template-columns': '1fr 1fr 1fr 1fr 1fr'
          },
          items: [
            ...(x.map((vr: any) => {
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
          ]
        }
      })
    )
  }

  private getPanelTable():DashboardPanel {
    return {
          name: '',
          class: ['grid'],
          style: {
            'grid-template-columns': '1fr 1fr 1fr 1fr 1fr'
          },
          items: [
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
        };
  }

}
