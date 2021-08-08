import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrowbeModuleDefFilter } from '../model/models';
import { GrowbeModuleDefPartial } from '../model/models';
import { GrowbeModuleDefWithRelations } from '../model/models';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeModuleDefControllerService {
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
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleDefControllerAddHardwareAlarm(id: string, body?: any, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleDefControllerAddHardwareAlarm(id: string, body?: any, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleDefControllerAddHardwareAlarm(id: string, body?: any, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * Get a filter list of GrowbeModuleDef
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleDefControllerFindById(id: string, filter?: GrowbeModuleDefFilter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModuleDefWithRelations>;
    growbeModuleDefControllerFindById(id: string, filter?: GrowbeModuleDefFilter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModuleDefWithRelations>>;
    growbeModuleDefControllerFindById(id: string, filter?: GrowbeModuleDefFilter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModuleDefWithRelations>>;
    /**
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleDefControllerRemoveHardwareAlarm(id: string, body?: any, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleDefControllerRemoveHardwareAlarm(id: string, body?: any, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleDefControllerRemoveHardwareAlarm(id: string, body?: any, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * Update a instance of GrowbeModuleDef
     * @param id
     * @param growbeModuleDefPartial
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleDefControllerUpdateById(id: string, growbeModuleDefPartial?: GrowbeModuleDefPartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeModuleDefControllerUpdateById(id: string, growbeModuleDefPartial?: GrowbeModuleDefPartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeModuleDefControllerUpdateById(id: string, growbeModuleDefPartial?: GrowbeModuleDefPartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeModuleDefControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeModuleDefControllerService>;
}
