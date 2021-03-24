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
import { GrowbeDashboardItem } from './growbeDashboardItem';


/**
 * (tsType: Omit<Partial<GrowbeDashboard>, >, schemaOptions: { title: \'\', partial: true, exclude: [] })
 */
export interface GrowbeDashboardPartial { 
  [key: string]: object | any;


    id?: string;
    userId?: string;
    name?: string;
    sidePanel?: Array<GrowbeDashboardItem>;
}

