import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { GrowbeModuleDef } from '@growbe2/ngx-cloud-api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getModuleDefPropName, GrowbeModuleDefAPI } from 'src/app/growbe/api/growbe-module-def';

@Component({
  selector: 'app-growbe-module-properties-select-form',
  templateUrl: './growbe-module-properties-select-form.component.html',
  styleUrls: ['./growbe-module-properties-select-form.component.scss']
})
export class GrowbeModulePropertiesSelectFormComponent implements OnInit {

  @Input()  moduleName: string;

  formGroup: FormGroup;
  propertiesFormData$: Observable<AutoFormData>;

  constructor(
    private moduleDefAPI: GrowbeModuleDefAPI,
  ) { }

  ngOnInit(): void {
    if (!this.moduleName) return;
    this.propertiesFormData$ = this.moduleDefAPI.getById(this.moduleName).pipe(
      map((moduleDef: GrowbeModuleDef) => {
        return {
          type: 'simple',
          items: [
            {
              type: 'object',
              name: 'object',
              templates: {
                header: 'Properties select',
              },
              decorators: {
                class: ['frow', 'half', 'evenly']
              },
              properties: Object.values(moduleDef.properties).map((prop) => ({
                name: prop.name, // getModuleDefPropName(moduleDef, prop),
                type: 'bool',
                displayName: getModuleDefPropName(moduleDef, prop),
                component: {
                  name: 'checkbox',
                }
              })),
            }
          ],
          event: {
            submit: () => {},
            afterFormCreated: (fg) => (this.formGroup = fg),
          },
          actionsButtons: {},
        } as AutoFormData;
      })
    );
  }

  getValue() {
    return this.formGroup.value;
  }

}
