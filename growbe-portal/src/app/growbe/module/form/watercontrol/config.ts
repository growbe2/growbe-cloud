import { FormGroup } from '@angular/forms';
import {
    AutoFormData,
    FormObject,
    UnionProperty,
} from '@berlingoqc/ngx-autoform';
import { of } from 'rxjs';
import { GrowbeActionAPI } from 'src/app/growbe/api/growbe-action';
import { timeFieldComponent } from '../../graph/service/growbe-graph.service';
import { getFormPropertieRelay, transformFieldInit, transformFieldSubmit } from '../relay-form';


export const getModuleWaterControlConfig: (
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
              }
            },
            properties: [
                ...['p0', 'p1', 'p2', 'drain', 'pump0', 'pump1', 'pump2', 'pump3'].map(
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
                drain: controls.drain.touched ? transformFieldSubmit('drain', data): undefined,
                pump0: controls.pump0.touched ? transformFieldSubmit('pump0', data): undefined,
                pump1: controls.pump1.touched ? transformFieldSubmit('pump1', data): undefined,
                pump2: controls.pump2.touched ? transformFieldSubmit('pump2', data): undefined,
                pump3: controls.pump3.touched ? transformFieldSubmit('pump3', data): undefined,
            };
            return growbeActionAPI.executeActionModule('GROWBE_CONFIG_UPDATE', mainboardId, moduleId, d);
        },
        initialData: () =>
            of({
                object: {
                    p0: transformFieldInit('p0', config),
                    p1: transformFieldInit('p1', config),
                    p2: transformFieldInit('p2', config),
                    drain: transformFieldInit('drain', config),
                    pump0: transformFieldInit('pump0', config),
                    pump1: transformFieldInit('pump1', config),
                    pump2: transformFieldInit('pump2', config),
                    pump3: transformFieldInit('pump3', config),
                },
            }),
    },
}
};
