import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AutoFormData, AutoFormDialogService } from '@berlingoqc/ngx-autoform';
import { TableColumn } from '@berlingoqc/ngx-autotable';
import { ActionConfirmationDialogComponent, ButtonsRowComponent } from '@berlingoqc/ngx-common';
import { CRUDDataSource, Where } from '@berlingoqc/ngx-loopback';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-table-layout',
    templateUrl: './table-layout.component.html',
    styleUrls: ['./table-layout.component.scss'],
})
export class TableLayoutComponent implements OnInit {
    @Input() columns: TableColumn[];
    @Input() where: Where;
    @Input() source: CRUDDataSource<any>;

    @Input() formData: AutoFormData;

    @Input() removeElement: (element: any) => Observable<any>;

    constructor(
      public autoForm: AutoFormDialogService,
      private dialog: MatDialog,
    ) {}

    ngOnInit(): void {
      this.columns = [...this.columns];
        if (this.removeElement) {
            this.columns.push({
                id: 'extra',
                title: '',
                content: {
                    type: 'component',
                    content: ButtonsRowComponent,
                    extra: {
                        inputs: {
                            buttons: [
                                {
                                    title: {
                                        type: 'icon',
                                        content: 'delete',
                                    },
                                    style: 'mat-mini-fab',
                                    // TODO add dialog to ask
                                    click: (router: any, context: any) =>
                                      this.dialog.open(ActionConfirmationDialogComponent, {
                                        data: {
                                          title: ''
                                        }
                                      }).afterClosed()
                                      .pipe(
                                        filter(x => x),
                                        switchMap(() => this.removeElement(context))
                                      )
                                },
                            ],
                        },
                    },
                },
            });
        }
    }
}
