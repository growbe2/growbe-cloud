import { Component, Input, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { OnDestroyMixin, untilComponentDestroyed } from '@berlingoqc/ngx-common';
import { Observable, of, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GrowbeModuleAPI } from 'src/app/growbe/api/growbe-module';
import { getAlarmPropertie, getCyclePropertie, transformRelayTimeToString } from '../../form/relay-form';


export interface RelayControl {
  getValues(): Observable<[any, any, any, boolean]>;
  changeManualState(config: any): Observable<void>;
}

@Component({
  selector: 'app-relay-base-control',
  templateUrl: './relay-base-control.component.html',
  styleUrls: ['./relay-base-control.component.scss']
})
export class RelayBaseControlComponent extends OnDestroyMixin(Object) implements OnInit {

  @Input() control: RelayControl;
  @Input() mainboardId: string;

  previousConfig: { [id: number]: any } = {};
  pendingConfig: any;
  config: any;
  value: any;
  endingAt: any;
  connected: boolean;

  requestConfig: Subscription;

  formConfigProperty: AutoFormData;

  constructor(private growbeModuleAPI: GrowbeModuleAPI,) {
    super();
  }

  async ngOnInit() {
    // faut que j'aille chercher la config et l'etat de cette propriétés
    this.control.getValues().pipe(untilComponentDestroyed(this)).subscribe((value) => {
      this.config = value[0];
      this.value = value[1];
      this.endingAt = value[2];
      this.connected = value[3];

      if (!this.pendingConfig) {
        this.pendingConfig = { ...this.config };
      }

      if (this.pendingConfig?.mode) {
        this.setForm();
      }
    });
  }

  onModeChange(mode: number) {
    this.previousConfig[this.pendingConfig.mode] = this.pendingConfig;
    if (mode === 0) {
      this.pendingConfig = {
        mode: 0,
        manual: { state: false }
      };
    } else if (mode === 1) {
      if (this.previousConfig[mode]) {
        this.pendingConfig = this.previousConfig[mode];
      } else {
        this.pendingConfig = {
          mode: 1,
          alarm: {}
        };
      }
    } else if (mode === 3) {
      if (this.previousConfig[mode]) {
        this.pendingConfig = this.previousConfig[mode];
      } else {
        this.pendingConfig = {
          mode: 3,
          cycle: {}
        };
      }
    }
    this.setForm();
  }

  onSlideState(change: MatSlideToggleChange) {
    this.requestConfig = this.control.changeManualState({ mode: 0, manual: { state: change.checked } }).subscribe(() => {
      this.requestConfig = null;
    }, (error) => {
      this.requestConfig = null;
      this.pendingConfig = undefined;
      this.growbeModuleAPI.requestFind.onModif(of(null)).subscribe();
      // return the state of the slide to the previous one
    });
  }


  private setForm() {
    if (this.pendingConfig?.mode === 3) {
      this.formConfigProperty = {
        type: 'simple',
        items: [
          getCyclePropertie()
        ],
        event: this.getFormEvent(this.pendingConfig.mode)
      }
    } else if (this.pendingConfig?.mode === 1) {
      this.formConfigProperty = {
        type: 'simple',
        items: [
          getAlarmPropertie()
        ],
        event: this.getFormEvent(this.pendingConfig.mode, (config) => {
          return {
            alarm: {
              begining: {
                hour: +config.alarm.begining.split(
                  ':',
                )[0],
                minute: +config.alarm.begining.split(
                  ':',
                )[1],
              },
              end: {
                hour: +config.alarm.end.split(
                  ':',
                )[0],
                minute: +config.alarm.end.split(
                  ':',
                )[1],
              },
            }
          }
        },
        (config) => {
          return {
            alarm: {
                        begining: transformRelayTimeToString(config?.alarm?.begining),
                        end: transformRelayTimeToString(config?.alarm?.end),
                    }
            }
          }
        )
      }
    }
  }


  private getFormEvent(mode: number, map_out?: (config) => any, map_int?: (config) => any) {
    return {
      submit: (config) => {
        if (map_out) {
          config = map_out(config);
        }
        return this.control.changeManualState({ mode, ...config }).pipe(
          tap(() => {
            this.growbeModuleAPI.requestFind.onModif(of(null)).subscribe();
            this.config = { mode, ...config };
            this.pendingConfig = this.config;
          })
        );
      },
      initialData: () => {
        return of(map_int ? map_int(this.pendingConfig) : this.pendingConfig);
      },
    }
  }


}
