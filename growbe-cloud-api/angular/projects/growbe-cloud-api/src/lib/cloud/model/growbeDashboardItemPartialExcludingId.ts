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
import { BaseDashboardElementExcludingId } from './baseDashboardElementExcludingId';


/**
 * (tsType: Omit<Partial<GrowbeDashboardItem>, \'id\'>, schemaOptions: { title: \'\', partial: true, exclude: [ \'id\' ] })
 */
export interface GrowbeDashboardItemPartialExcludingId { 
  [key: string]: object | any;


    growbeDashboardId?: string;
    name?: string;
    items?: Array<BaseDashboardElementExcludingId>;
}

