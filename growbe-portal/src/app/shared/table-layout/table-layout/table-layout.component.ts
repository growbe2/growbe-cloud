import { Component, Input, OnInit } from '@angular/core';
import { AutoFormData, AutoFormDialogService } from '@berlingoqc/ngx-autoform';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { CRUDDataSource, Where } from '@berlingoqc/ngx-loopback';

@Component({
  selector: 'app-table-layout',
  templateUrl: './table-layout.component.html',
  styleUrls: ['./table-layout.component.scss']
})
export class TableLayoutComponent implements OnInit {
  @Input() columns: TableColumn[];
  @Input() where: Where;
  @Input() source: CRUDDataSource<any>;

  @Input() formData: AutoFormData;

  constructor(
    public autoForm: AutoFormDialogService
  ) {
  }

  ngOnInit(): void {
  }

}
