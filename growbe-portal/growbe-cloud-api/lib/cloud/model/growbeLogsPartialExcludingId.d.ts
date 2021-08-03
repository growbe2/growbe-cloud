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
 * (tsType: Omit<Partial<GrowbeLogs>, \'id\'>, schemaOptions: { title: \'\', partial: true, exclude: [ \'id\' ] })
 */
export interface GrowbeLogsPartialExcludingId {
    [key: string]: object | any;
    timestamp?: string;
    severity?: GrowbeLogsPartialExcludingId.SeverityEnum;
    group?: GrowbeLogsPartialExcludingId.GroupEnum;
    type?: GrowbeLogsPartialExcludingId.TypeEnum;
    message?: string;
    newState?: object;
    oldState?: object;
    growbeMainboardId?: string;
    growbeModuleId?: string;
}
export declare namespace GrowbeLogsPartialExcludingId {
    type SeverityEnum = '0' | '1' | '2';
    const SeverityEnum: {
        _0: import("./growbeLogs").GrowbeLogs.SeverityEnum;
        _1: import("./growbeLogs").GrowbeLogs.SeverityEnum;
        _2: import("./growbeLogs").GrowbeLogs.SeverityEnum;
    };
    type GroupEnum = 'mainboard' | 'modules';
    const GroupEnum: {
        Mainboard: import("./growbeLogs").GrowbeLogs.GroupEnum;
        Modules: import("./growbeLogs").GrowbeLogs.GroupEnum;
    };
    type TypeEnum = 'module' | 'module_config' | 'connection' | 'new_warning' | 'update_rtc' | 'sync_request' | 'growbe_config' | 'alarm';
    const TypeEnum: {
        Module: import("./growbeLogs").GrowbeLogs.TypeEnum;
        ModuleConfig: import("./growbeLogs").GrowbeLogs.TypeEnum;
        Connection: import("./growbeLogs").GrowbeLogs.TypeEnum;
        NewWarning: import("./growbeLogs").GrowbeLogs.TypeEnum;
        UpdateRtc: import("./growbeLogs").GrowbeLogs.TypeEnum;
        SyncRequest: import("./growbeLogs").GrowbeLogs.TypeEnum;
        GrowbeConfig: import("./growbeLogs").GrowbeLogs.TypeEnum;
        Alarm: import("./growbeLogs").GrowbeLogs.TypeEnum;
    };
}
