import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { TemplateContentDataStructure } from '@berlingoqc/ngx-common';
import { CRUDDataSource, Include, Where } from '@berlingoqc/ngx-loopback';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit, AfterViewInit {
  @ViewChild('status') status: TemplateRef<any>

  @Input() where: Where = {};
  // Include pour requête loopback
  @Input() includes: Include[] = [];

  @Input() source: CRUDDataSource<any>;

  columns: TableColumn[] = [
    {
      id: 'id',
      title: 'ID',
      content: (g) => g.id,
    },
    {
      id: 'name',
      title: 'UID',
      content: (g) => g.uid
    },
    {
      id: 'status',
      title: 'Status',
      content: {
        type: 'template',
        content: null,
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    (this.columns[2].content as TemplateContentDataStructure).content = this.status
    console.log(this.columns);
  }

}
