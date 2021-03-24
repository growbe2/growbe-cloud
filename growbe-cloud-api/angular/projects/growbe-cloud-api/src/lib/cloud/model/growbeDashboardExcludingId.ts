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
import { GrowbeDashboardItemExcludingId } from './growbeDashboardItemExcludingId';


/**
 * (tsType: Omit<GrowbeDashboard, \'id\'>, schemaOptions: { title: \'\', partial: undefined, exclude: [ \'id\' ] })
 */
export interface GrowbeDashboardExcludingId { 
  [key: string]: object | any;


    userId?: string;
    name?: string;
    sidePanel?: Array<GrowbeDashboardItemExcludingId>;
}
