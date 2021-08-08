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
export interface GrowbeModuleFilter1 {
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string | Array<string>;
    where?: {
        [key: string]: object;
    };
    fields?: object | Set<string>;
    include?: Array<GrowbeModuleIncludeFilterItems | string>;
}
