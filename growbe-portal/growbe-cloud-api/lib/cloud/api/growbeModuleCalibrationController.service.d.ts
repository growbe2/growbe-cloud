import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeModuleCalibrationControllerService {
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
     * @param moduleid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleCalibrationControllerCancelCalibration(id: string, moduleid: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleCalibrationControllerCancelCalibration(id: string, moduleid: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleCalibrationControllerCancelCalibration(id: string, moduleid: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param moduleid
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleCalibrationControllerConfirmCalibration(id: string, moduleid: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleCalibrationControllerConfirmCalibration(id: string, moduleid: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleCalibrationControllerConfirmCalibration(id: string, moduleid: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param moduleid
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleCalibrationControllerSetCalibration(id: string, moduleid: string, body?: any, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleCalibrationControllerSetCalibration(id: string, moduleid: string, body?: any, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleCalibrationControllerSetCalibration(id: string, moduleid: string, body?: any, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param moduleid
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleCalibrationControllerStartCalibration(id: string, moduleid: string, body?: any, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleCalibrationControllerStartCalibration(id: string, moduleid: string, body?: any, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleCalibrationControllerStartCalibration(id: string, moduleid: string, body?: any, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param moduleid
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleCalibrationControllerStatusCalibration(id: string, moduleid: string, body?: any, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleCalibrationControllerStatusCalibration(id: string, moduleid: string, body?: any, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleCalibrationControllerStatusCalibration(id: string, moduleid: string, body?: any, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeModuleCalibrationControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeModuleCalibrationControllerService>;
}
