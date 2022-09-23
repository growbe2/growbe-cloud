import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { GrowbeActionAPI } from '../../api/growbe-action';
import { getRelayControlConfig } from './relaycontrol/config';
import { getSoilConfigForm } from './soil/config';
import { getPhoneStreamingConfig  } from './phonestreaming/config';
import { getModuleWaterControlConfig } from './watercontrol/config';
import { Injector } from '@angular/core';

export * from './watercontrol/config';

export const getConfigForm = (
    name: string,
): ((
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
    injecotor: Injector,
) => AutoFormData) => {
    switch (name) {
        case 'AAB':
            return getModuleWaterControlConfig;
        case 'AAP':
            return getRelayControlConfig;
        case 'AAS':
            return getSoilConfigForm;
        case 'PCS':
            return getPhoneStreamingConfig;
        default:
            return null;
    }
};
