import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { ButtonsRowComponent } from '@berlingoqc/ngx-common';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';
import { getTableDeleteButton } from 'src/app/helpers/table';

@Component({
  selector: 'app-virtual-relay-table',
  templateUrl: './virtual-relay-table.component.html',
  styleUrls: ['./virtual-relay-table.component.scss']
})
export class VirtualRelayTableComponent implements OnInit {
  
  @Input() growbeId: string;

  columns: TableColumn[];

  constructor(
    public mainboardAPI: GrowbeMainboardAPI,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.columns = [
      {
        id: 'id',
        title: 'ID',
        content: (e) => e.id
      },
      {
        id: 'state',
        title: 'State',
        content: (e) => e.state || false
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
                getTableDeleteButton(this.matDialog, this.mainboardAPI.virtualRelays(this.growbeId), (vr) => vr.id)
              ]
            }
          }
        }
      }
    ];
  }

}
