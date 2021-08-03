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
export interface GrowbeSensorValue {
    [key: string]: object | any;
    id?: string;
    /**
     * type of the module ex: AAB
     */
    moduleType?: string;
    moduleId?: string;
    growbeMainboardId?: string;
    /**
     * starting point of the growbe sensor value document
     */
    createdAt?: number;
    /**
     * ending point of the growbe sensor value document
     */
    endingAt?: number;
    /**
     * last value
     */
    values?: object;
    /**
     * historic of data during this minutes
     */
    samples?: object;
}
