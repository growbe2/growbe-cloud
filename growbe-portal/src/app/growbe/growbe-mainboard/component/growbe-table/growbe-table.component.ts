import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { CRUDDataSource, Filter, Include, Where } from '@berlingoqc/ngx-loopback';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';

@Component({
  selector: 'app-growbe-table',
  templateUrl: './growbe-table.component.html',
  styleUrls: ['./growbe-table.component.scss']
})
export class GrowbeTableComponent implements OnInit, AfterViewInit {

  @ViewChild('status') status: TemplateRef<any>;

  @Input() where: Where = {};
  // Include pour requête loopback
  @Input() includes: Include[] = [];

  columns: TableColumn[] = [
    {
      id: 'id',
      title: {
        type: 'string',
        content: 'ID'
      },
      content: {
        type: 'func',
        content: (g) => g.id,
      }
    },
    {
      id: 'name',
      title: {
        type: 'string',
        content: 'Nom'
      },
      content: {
        type: 'func',
        content: (g) => g.name
      }
    },
    {
      id: 'status',
      title: {
        type: 'string',
        content: 'Status'
      },
      content: {
        type: 'template',
        content: null,
      }
    }
  ];

  constructor(
    public source: GrowbeMainboardAPI
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.columns[2].content.content = this.status;
  }

}
