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
import { GrowbeMainboardWithRelations } from './growbeMainboardWithRelations';


/**
 * (tsType: GrowbeSensorValueWithRelations, schemaOptions: { includeRelations: true })
 */
export interface GrowbeSensorValueWithRelations { 
  [key: string]: object | any;


    id?: string;
    moduleType?: string;
    moduleId?: string;
    growbeMainboardId?: string;
    createdAt?: string;
    growbeMainboard?: GrowbeMainboardWithRelations;
}
