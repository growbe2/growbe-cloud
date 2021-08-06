/**
 * growbe-cloud
 * Cloud server for Growbe
 *
 * The version of the OpenAPI document: 0.0.0
 * Contact: wquintal@berlingoqc.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { GrowbeMainboard } from './growbeMainboard';
export interface GrowbeRegisterResponse {
    state?: GrowbeRegisterResponse.StateEnum;
    growbe?: GrowbeMainboard;
}
export declare namespace GrowbeRegisterResponse {
    type StateEnum = 'BEATH_UNREGISTER' | 'UNBEATH_REGISTER' | 'UNREGISTER' | 'REGISTER' | 'ALREADY_REGISTER' | 'NOT_ACCESSIBLE' | 'ALREADY_REGISTER_ORGANISATION' | 'REGISTER_ORGANISATION';
    const StateEnum: {
        BeathUnregister: StateEnum;
        UnbeathRegister: StateEnum;
        Unregister: StateEnum;
        Register: StateEnum;
        AlreadyRegister: StateEnum;
        NotAccessible: StateEnum;
        AlreadyRegisterOrganisation: StateEnum;
        RegisterOrganisation: StateEnum;
    };
}