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
 * (tsType: BaseDashboardElementWithRelations, schemaOptions: { includeRelations: true })
 */
export interface BaseDashboardElementWithRelations { 
    name?: string;
    type?: BaseDashboardElementWithRelations.TypeEnum;
}
export namespace BaseDashboardElementWithRelations {
    export type TypeEnum = 'graph' | 'average' | 'clock';
    export const TypeEnum = {
        Graph: 'graph' as TypeEnum,
        Average: 'average' as TypeEnum,
        Clock: 'clock' as TypeEnum
    };
}


