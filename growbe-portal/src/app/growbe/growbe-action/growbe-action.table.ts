import { Router } from "@angular/router";
import { AutoFormData, AutoFormDialogService } from "@berlingoqc/ngx-autoform";
import { TableColumn } from "@berlingoqc/ngx-autotable";
import { ButtonsRowComponent } from "@berlingoqc/ngx-common";
import { StaticDataSource } from "@berlingoqc/ngx-loopback";
import { Observable, Subscriber } from "rxjs";
import { filter, finalize, map } from "rxjs/operators";
import { GrowbeActionAPI } from "src/app/growbe/api/growbe-action";
import { GrowbeEventService } from "../services/growbe-event.service";
import { growbeActions } from './growbe-warning-action';


export const growbeActionsSource = new StaticDataSource([
  {
    name: 'Set RTC clock',
    description: 'Set the RTC clock of your mainboard',
    warningKeyId: 'RTC_OFFSET'
  },
  {
    name: 'Sync',
    description: 'Ask the mainboard to sync back the module state (after deconnection)',
    warningKeyId: 'DESYNC',
  },
  {
    name: 'LocalConnection',
    description: "Ask mainboard to resend his local connection information",
    warningKeyId: "LOCAL_CONNECTION"
  },
  {
    name: 'HelloWorld',
    description: "Ask mainboard to resend his hello world informaton (version)",
    warningKeyId: "HELLO_WORLD",
  },
  {
    name: 'Restart',
    description: "Ask mainboard to restart the process",
    warningKeyId: "RESTART"
  },
  {
    name: 'Reboot',
    description: "Ask the mainboard to reboot the pi",
    warningKeyId: "REBOOT",
  }
]);

export const getGrowbeActionTableColumns = (getGrowbeId: () => string, eventService: GrowbeEventService, actionAPI: GrowbeActionAPI, autoformDialog: AutoFormDialogService): TableColumn[] => ([
  {
    id: 'name',
    title: 'Name',
    content: (e) => e.name
  },
  {
    id: 'description',
    title: 'Description',
    content: (e) => e.description
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
                                {
                                    title: {
                                        type: 'icon',
                                        content: 'pending_actions',
                                    },
                                    style: 'mat-mini-fab',
                                    disabled: eventService.getGrowbeLive(getGrowbeId()).pipe(map((mainboard) => mainboard.state === 'DISCONNECTED')),
                                    click: (
                                        router: Router,
                                        context: any,
                                    ) => {
                                        const action =
                                            growbeActions[
                                                context.warningKeyId
                                            ];
                                        let loadingResolver: Subscriber<unknown>;
                                        if (action?.formFunc) {
                                            const form = action.formFunc() as AutoFormData;
                                            (form.event.submit = (
                                                data: any,
                                            ) => {
                                                data = action.formFuncTransform(
                                                    data,
                                                );
                                                return actionAPI.executeAction(
                                                    context.warningKeyId,
                                                    getGrowbeId(),
                                                    data,
                                                )
                                                .pipe(
                                                  finalize(() => {
                                                    loadingResolver?.complete()
                                                  },
                                                ));
                                            }),
                                            autoformDialog.open(form).afterClosed().pipe(
                                              filter(x => typeof x !== 'object'),
                                              map(() => loadingResolver?.complete())
                                            ).subscribe();
                                            return new Observable((resolv) => {
                                              loadingResolver = resolv;
                                            });
                                        }
                                    },
                                },
                            ],
                        },
                    },
    }
  }
]);
