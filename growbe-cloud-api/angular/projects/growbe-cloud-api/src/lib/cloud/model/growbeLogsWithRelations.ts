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


/**
 * (tsType: GrowbeLogsWithRelations, schemaOptions: { includeRelations: true })
 */
export interface GrowbeLogsWithRelations { 
  [key: string]: object | any;


    id?: string;
    timestamp?: string;
    severity?: GrowbeLogsWithRelations.SeverityEnum;
    group?: GrowbeLogsWithRelations.GroupEnum;
    type?: GrowbeLogsWithRelations.TypeEnum;
    message?: string;
    newState?: object;
    oldState?: object;
    growbeMainboardId?: string;
    growbeModuleId?: string;
}
export namespace GrowbeLogsWithRelations {
    export type SeverityEnum = '0' | '1' | '2';
    export const SeverityEnum = {
        _0: '0' as SeverityEnum,
        _1: '1' as SeverityEnum,
        _2: '2' as SeverityEnum
    };
    export type GroupEnum = 'mainboard' | 'modules';
    export const GroupEnum = {
        Mainboard: 'mainboard' as GroupEnum,
        Modules: 'modules' as GroupEnum
    };
    export type TypeEnum = 'module' | 'connection' | 'new_warning' | 'update_rtc';
    export const TypeEnum = {
        Module: 'module' as TypeEnum,
        Connection: 'connection' as TypeEnum,
        NewWarning: 'new_warning' as TypeEnum,
        UpdateRtc: 'update_rtc' as TypeEnum
    };
}


