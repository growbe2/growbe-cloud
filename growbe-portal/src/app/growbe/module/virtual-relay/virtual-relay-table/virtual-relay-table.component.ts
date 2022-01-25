import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { ButtonsRowComponent, OnDestroyMixin, StateChange, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { of, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { GrowbeEventService } from 'src/app/growbe/services/growbe-event.service';
import { getTableDeleteButton } from 'src/app/helpers/table';

@Component({
  selector: 'app-virtual-relay-table',
  templateUrl: './virtual-relay-table.component.html',
  styleUrls: ['./virtual-relay-table.component.scss']
})
export class VirtualRelayTableComponent extends OnDestroyMixin(Object) implements OnInit {
  
  @Input() growbeId: string;

  columns: TableColumn[];

  constructor(
    public mainboardAPI: GrowbeMainboardAPI,
    public matDialog: MatDialog,
    private growbeEventService: GrowbeEventService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.growbeEventService.getGrowbeEvent(this.growbeId, "/cloud/virtualrelay/+/state", (d) => JSON.parse(d)).pipe(
      untilComponentDestroyed(this),
      tap(() => console.log('EVENVENVENVEN ')),
      switchMap((data) => this.mainboardAPI.virtualRelays(this.growbeId).requestGet.onModif(of({} as StateChange<any>)))
    ).subscribe();
    this.columns = [
      {
        id: 'id',
        title: 'ID',
        content: (e) => e.id
      },
      {
        id: 'state',
        title: 'State',
        content: (e) => ((e.state || false) ? 'created' : 'notcreated'),
      },
      {
        id: 'info',
        title: 'Info',
        content: (e) => of('dadada')
      },
      {
        id: 'options',
        title: 'Options', 
        content: {
          type: 'component',
          content: ButtonsRowComponent,
          extra: {
            inputs: {
              buttons: [
                getTableDeleteButton(this.matDialog, this.mainboardAPI.virtualRelays(this.growbeId), (vr: any) => vr.id)
              ]
            }
          }
        }
      }
    ];
  }

}
