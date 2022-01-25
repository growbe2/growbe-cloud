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
export declare namespace GrowbeLogsWithRelations {
    type SeverityEnum = '0' | '1' | '2';
    const SeverityEnum: {
        _0: SeverityEnum;
        _1: SeverityEnum;
        _2: SeverityEnum;
    };
    type GroupEnum = 'mainboard' | 'modules';
    const GroupEnum: {
        Mainboard: GroupEnum;
        Modules: GroupEnum;
    };
    type TypeEnum = 'module' | 'module_config' | 'connection' | 'local_connection' | 'new_warning' | 'update_rtc' | 'sync_request' | 'growbe_config' | 'alarm' | 'restart' | 'updated';
    const TypeEnum: {
        Module: TypeEnum;
        ModuleConfig: TypeEnum;
        Connection: TypeEnum;
        LocalConnection: TypeEnum;
        NewWarning: TypeEnum;
        UpdateRtc: TypeEnum;
        SyncRequest: TypeEnum;
        GrowbeConfig: TypeEnum;
        Alarm: TypeEnum;
        Restart: TypeEnum;
        Updated: TypeEnum;
    };
}
