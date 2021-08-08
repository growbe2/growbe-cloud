import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrowbeMainboard } from '../model/models';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeModuleDefGrowbeMainboardControllerService {
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleDefGrowbeMainboardControllerGetGrowbeMainboard(id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<Array<GrowbeMainboard>>;
    growbeModuleDefGrowbeMainboardControllerGetGrowbeMainboard(id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<Array<GrowbeMainboard>>>;
    growbeModuleDefGrowbeMainboardControllerGetGrowbeMainboard(id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<Array<GrowbeMainboard>>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeModuleDefGrowbeMainboardControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeModuleDefGrowbeMainboardControllerService>;
}
