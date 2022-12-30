import { MatLegacyDialog as MatDialog } from "@angular/material/legacy-dialog"
import { Router } from "@angular/router"
import { ActionConfirmationDialogComponent, Button } from "@berlingoqc/ngx-common"
import { CRUDDataSource } from "@berlingoqc/ngx-loopback"
import { notify } from "@berlingoqc/ngx-notification"
import { filter, switchMap } from "rxjs/operators"

export function getTableDeleteButton<T>(
  dialog: MatDialog,
  datasouce: CRUDDataSource<T>,
  getId: (v: T) => any,
): Button {

  return {
    title: {
        type: 'icon',
        content: 'delete'
    },
    style: 'mat-mini-fab',
    color: 'accent',
    click: (router: Router, ctx: T) => {
        return dialog.open(ActionConfirmationDialogComponent, {
            data: { title: 'Do you want to deleted ressource ?'}
        }).afterClosed().pipe(
            filter(x => x),
            switchMap(() => datasouce.delete(getId(ctx))),
            notify({
                    title: 'Stream supprimé',
                    titleFailed: 'Échec. Veuillez réssayer.',
                    body: () => getId(ctx),
            }),
        )
    }
  }
}

export function getTableEditButton(): Button {

  return {
    title: '',
  }
}