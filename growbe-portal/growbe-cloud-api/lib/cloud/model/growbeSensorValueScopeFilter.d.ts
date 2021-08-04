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
export interface GrowbeSensorValueScopeFilter {
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string | Array<string>;
    where?: {
        [key: string]: object;
    };
    fields?: any | Set<string>;
    include?: Array<{
        [key: string]: object;
    }>;
}
