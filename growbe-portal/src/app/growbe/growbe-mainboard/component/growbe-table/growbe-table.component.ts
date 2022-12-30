import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AutoTableComponent, TableColumn } from '@berlingoqc/ngx-autotable';
import { ActionConfirmationDialogComponent } from '@berlingoqc/ngx-common';
import {
    CRUDDataSource,
    Filter,
    Include,
    Where,
} from '@berlingoqc/ngx-loopback';
import { GrowbeMainboard } from '@growbe2/ngx-cloud-api';
import { of } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { GrowbeMainboardAPI } from 'src/app/growbe/api/growbe-mainboard';

@Component({
    selector: 'app-growbe-table',
    templateUrl: './growbe-table.component.html',
    styleUrls: ['./growbe-table.component.scss'],
})
export class GrowbeTableComponent implements OnInit, AfterViewInit {
    @ViewChild(AutoTableComponent) autoTable: AutoTableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('options') options: TemplateRef<any>;

    @Input() source: CRUDDataSource<GrowbeMainboard>;

    @Input() where: Where = {};
    // Include pour requête loopback
    @Input() includes: Include[] = [];

    columns: TableColumn[] = [
        {
            id: 'id',
            title: 'ID',
            content: (g) => g.id,
        },
        {
            id: 'name',
            title: 'Nom',
            content: (g) => g.name,
        },
        {
            id: 'status',
            title: 'Status',
            content: {
                type: 'template',
                content: null,
            },
        },
        {
            id: 'options',
            title: 'Options',
            content: {
                type: 'template',
                content: null,
            },
        },
    ];

    constructor(private dialog: MatDialog) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        (this.columns[2].content as any).content = this.status;
        (this.columns[3].content as any).content = this.options;
    }


    delete(mainboard: GrowbeMainboard) {
      this.dialog.open(ActionConfirmationDialogComponent, {
        data: {
          title: ''
        }
      }).afterClosed()
        .pipe(
          filter(x => x),
          switchMap(() => this.source.delete(mainboard.id))
        ).subscribe(() => {
          // TEMPORARY FIXE UNTIL I UPDATE CACHING
          //Object.values(this.source.requestGet.items).forEach((item) => {
          //  item.subject.next(null);
          //});
          //Object.values(this.source.requestCount.items).forEach((item) => {
          //  item.subject.next(null)
          //});
        });
    }
}
