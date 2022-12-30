import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AutoFormData, AutoFormDialogService } from '@berlingoqc/ngx-autoform';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { ActionConfirmationDialogComponent, ButtonsRowComponent } from '@berlingoqc/ngx-common';
import { CRUDDataSource, Where } from '@berlingoqc/ngx-loopback';
import { Observable, of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-table-layout',
    templateUrl: './table-layout.component.html',
    styleUrls: ['./table-layout.component.scss'],
})
export class TableLayoutComponent implements OnInit {
    @ViewChild(AutoTableComponent) autoTableComponent: AutoTableComponent;

    @Input() columns: TableColumn[];
    @Input() where: Where;
    @Input() source: CRUDDataSource<any>;

    @Input() formData: AutoFormData;
    @Input() disablePaginator: boolean;

    @Input() removeElement: (element: any) => Observable<any>;

    @Input() formEdit: AutoFormData;;

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
                                ...(this.formEdit ? [{
                                    title: {
                                      type: 'icon',
                                      content: 'edit',
                                    },
                                    style: 'mat-mini-fab',
                                    click: (router: any, context: any) => {
                                      if (typeof this.formEdit.event.initialData === "function") {
                                        const f = this.formEdit.event.initialData;
                                        this.formEdit.event.initialData = f(context);
                                      } else {
                                        this.formEdit.event.initialData = of(context);
                                      }
                                      this.autoForm.open(this.formEdit);
                                    }
                                }]: []),
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
