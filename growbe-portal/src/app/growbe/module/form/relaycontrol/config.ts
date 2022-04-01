import { FormGroup } from '@angular/forms';
import {
    AutoFormData,
    FormObject,
    UnionProperty,
} from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { PreventParentScrollDirective } from 'src/app/helpers/prevent-parent-scroll.directive';
import { timeFieldComponent } from '../../graph/service/growbe-graph.service';
import { getFormPropertieRelay, transformFieldInit, transformFieldSubmit } from '../relay-form';


export const getRelayControlConfig: (
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
) => AutoFormData = (
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
) => {
  let formGroup: FormGroup;
  return {
    type: 'simple',
    items: [
        {
            type: 'object',
            name: 'object',
            decorators: {
              style: {
                'max-height': '400px',
                'overflow': 'auto'
              },
              custom: [
                {
                  type: PreventParentScrollDirective,
                  resolver: (e) => [e],
                }
              ]
            },
            properties: [
                ...['p0', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'].map(
                    (itext) =>
                        ({
                            type: 'object',
                            templates: {
                                header: moduleDef.properties[itext].displayName
                                    ? moduleDef.properties[itext].displayName
                                    : itext,
                            },
                            name: itext,
                            properties: getFormPropertieRelay(),
                        } as FormObject),
                ),
            ],
        },
    ],
    event: {
        afterFormCreated: (fG: FormGroup) => {
          formGroup = fG;
        },
        submit: (data) => {
            const controls = (formGroup.controls.object as FormGroup).controls;
            const d = {
                p0: controls.p0.touched ? transformFieldSubmit('p0', data): undefined,
                p1: controls.p1.touched ? transformFieldSubmit('p1', data): undefined,
                p2: controls.p2.touched ? transformFieldSubmit('p2', data): undefined,
                p3: controls.p3.touched ? transformFieldSubmit('p3', data): undefined,
                p4: controls.p4.touched ? transformFieldSubmit('p4', data): undefined,
                p5: controls.p5.touched ? transformFieldSubmit('p5', data): undefined,
                p6: controls.p6.touched ? transformFieldSubmit('p6', data): undefined,
                p7: controls.p7.touched ? transformFieldSubmit('p7', data): undefined,
            };
            return growbeActionAPI.executeActionModule('GROWBE_CONFIG_UPDATE', mainboardId, moduleId, d);
        },
        initialData: () =>
            of({
                object: {
                    p0: transformFieldInit('p0', config),
                    p1: transformFieldInit('p1', config),
                    p2: transformFieldInit('p2', config),
                    p3: transformFieldInit('p3', config),
                    p4: transformFieldInit('p4', config),
                    p5: transformFieldInit('p5', config),
                    p6: transformFieldInit('p6', config),
                    p7: transformFieldInit('p7', config),
                },
            }),
    },
}
};
