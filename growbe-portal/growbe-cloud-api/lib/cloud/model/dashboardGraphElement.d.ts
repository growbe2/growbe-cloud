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
import { GraphDataConfig } from './graphDataConfig';
import { ModuleDataRequest } from './moduleDataRequest';
export interface DashboardGraphElement {
    name?: string;
    type?: DashboardGraphElement.TypeEnum;
    graphType?: DashboardGraphElement.GraphTypeEnum;
    graphConfig?: GraphDataConfig;
    graphDataConfig?: ModuleDataRequest;
}
export declare namespace DashboardGraphElement {
    type TypeEnum = 'graph' | 'average' | 'lastread' | 'clock';
    const TypeEnum: {
        Graph: TypeEnum;
        Average: TypeEnum;
        Lastread: TypeEnum;
        Clock: TypeEnum;
    };
    type GraphTypeEnum = 'line' | 'bar-vertical';
    const GraphTypeEnum: {
        Line: GraphTypeEnum;
        BarVertical: GraphTypeEnum;
    };
}
