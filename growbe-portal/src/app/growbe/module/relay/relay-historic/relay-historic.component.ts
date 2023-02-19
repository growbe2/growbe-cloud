import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {TableColumn} from '@berlingoqc/ngx-autotable';
import {CRUDDataSource, StaticDataSource} from '@berlingoqc/ngx-loopback';
import {map, Observable} from 'rxjs';
import {RelayHistoricAPI} from 'src/app/growbe/api/relay-historic.service';
import {TimestampPipe} from 'src/app/shared/dated-value/timestamp.pipe';

@Component({
  selector: 'app-relay-historic',
  templateUrl: './relay-historic.component.html',
  styleUrls: ['./relay-historic.component.scss'],
  providers: [TimestampPipe]
})
export class RelayHistoricComponent implements OnInit {

  @Input() moduleId: string;
  @Input() property: string;
  @Input() since?: number;


  columns: TableColumn[] = [
    {
      id: 'state',
      title: 'State',
      content: {
        type: 'icon',
        content: (d) => d.state ? 'power' : 'power_off'
      }
    },
    {
      id: 'timestamp',
      title: 'Changed At',
      content: (d) => this.timestampPipe.transform(d.timestamp),
      /*content: {
        type: 'func',
        content: (d) => {
          console.log(d.timestamp);
          return this.timestampPipe.transform(d.timestamp);
        },
      }*/
    }
  ];


  source$: Observable<CRUDDataSource<any>>;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) data: any,
    private relayHistoricAPI: RelayHistoricAPI,
    private timestampPipe: TimestampPipe,
  ) {
    if (data) {
      this.moduleId = data.moduleId;
      this.property = data.property;
      this.since = data.since;

    }
  }

  ngOnInit(): void {
    this.source$ = this.relayHistoricAPI.getRelayHistoric(
      this.moduleId, this.property, this.since
    ).pipe(
      map(values => new StaticDataSource(values))
    );
  }

}
