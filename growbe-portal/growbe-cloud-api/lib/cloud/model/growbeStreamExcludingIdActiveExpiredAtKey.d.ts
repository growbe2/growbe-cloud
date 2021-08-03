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
 * (tsType: Omit<GrowbeStream, \'id\' | \'active\' | \'expiredAt\' | \'key\'>, schemaOptions: { exclude: [ \'id\', \'active\', \'expiredAt\', \'key\' ] })
 */
export interface GrowbeStreamExcludingIdActiveExpiredAtKey {
    [key: string]: object | any;
    growbeMainboardId?: string;
    streamName?: string;
    url?: string;
}
