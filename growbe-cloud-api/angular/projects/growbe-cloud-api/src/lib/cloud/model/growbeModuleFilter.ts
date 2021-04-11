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
import { GrowbeModuleIncludeFilterItems } from './growbeModuleIncludeFilterItems';


export interface GrowbeModuleFilter { 
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string | Array<string>;
    fields?: any | Set<string>;
    include?: Array<GrowbeModuleIncludeFilterItems | string>;
}

