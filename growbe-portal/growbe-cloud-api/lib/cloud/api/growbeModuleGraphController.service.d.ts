import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GraphModuleRequest } from '../model/models';
import { ModuleDataRequest } from '../model/models';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeModuleGraphControllerService {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string, configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * @param id
     * @param graphModuleRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleGraphControllerGetGraph(id: string, graphModuleRequest?: GraphModuleRequest, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleGraphControllerGetGraph(id: string, graphModuleRequest?: GraphModuleRequest, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleGraphControllerGetGraph(id: string, graphModuleRequest?: GraphModuleRequest, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param moduleDataRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleGraphControllerGetLastValue(id: string, moduleDataRequest?: ModuleDataRequest, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleGraphControllerGetLastValue(id: string, moduleDataRequest?: ModuleDataRequest, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleGraphControllerGetLastValue(id: string, moduleDataRequest?: ModuleDataRequest, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeModuleGraphControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeModuleGraphControllerService>;
}
