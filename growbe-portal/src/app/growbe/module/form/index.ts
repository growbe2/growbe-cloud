import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { GrowbeModuleAPI } from '../../api/growbe-module';
import { getModuleWaterControlConfig } from './watercontrol/config';

export * from './watercontrol/config';

export const getConfigForm = (
    name: string,
): ((
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeModuleAPI: GrowbeModuleAPI,
) => AutoFormData) => {
    switch (name) {
        case 'AAB':
            return getModuleWaterControlConfig;
        default:
            return null;
    }
};
