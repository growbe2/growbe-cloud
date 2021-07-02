import { AutoFormData } from '@berlingoqc/ngx-autoform';
import { GrowbeActionAPI } from '../../api/growbe-action';
import { getModuleWaterControlConfig } from './watercontrol/config';

export * from './watercontrol/config';

export const getConfigForm = (
    name: string,
): ((
    mainboardId: string,
    moduleId: string,
    config: any,
    moduleDef: any,
    growbeActionAPI: GrowbeActionAPI,
) => AutoFormData) => {
    switch (name) {
        case 'AAB':
            return getModuleWaterControlConfig;
        default:
            return null;
    }
};
