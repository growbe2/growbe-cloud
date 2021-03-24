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
import { GrowbeModuleDefWithRelations } from './growbeModuleDefWithRelations';
import { GrowbeSensorValueWithRelations } from './growbeSensorValueWithRelations';
import { GrowbeLogsWithRelations } from './growbeLogsWithRelations';
import { GrowbeMainboardWithRelations } from './growbeMainboardWithRelations';


/**
 * (tsType: GrowbeModuleWithRelations, schemaOptions: { includeRelations: true })
 */
export interface GrowbeModuleWithRelations { 
  [key: string]: object | any;


    id?: string;
    uid?: string;
    connected?: boolean;
    readCount?: number;
    mainboardId?: string;
    moduleName?: string;
    growbeSensorValues?: Array<GrowbeSensorValueWithRelations>;
    mainboard?: GrowbeMainboardWithRelations;
    moduleDef?: GrowbeModuleDefWithRelations;
    growbeLogs?: Array<GrowbeLogsWithRelations>;
}

