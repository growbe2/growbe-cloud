import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrowbeDashboard } from '../model/models';
import { GrowbeDashboardFilter } from '../model/models';
import { GrowbeDashboardFilter1 } from '../model/models';
import { GrowbeDashboardWithRelations } from '../model/models';
import { LoopbackCount } from '../model/models';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeDashboardControllerService {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string, configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Get a filter list of GrowbeDashboard
     * @param where
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<LoopbackCount>;
    growbeDashboardControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<LoopbackCount>>;
    growbeDashboardControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<LoopbackCount>>;
    /**
     * Create a new instance of GrowbeDashboard
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerCreate(requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeDashboard>;
    growbeDashboardControllerCreate(requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeDashboard>>;
    growbeDashboardControllerCreate(requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeDashboard>>;
    /**
     * Delete a instance of GrowbeDashboard
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerDeleteById(id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeDashboardControllerDeleteById(id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeDashboardControllerDeleteById(id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    /**
     * Get a filter list of GrowbeDashboard
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerFind(filter?: GrowbeDashboardFilter1, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<Array<GrowbeDashboardWithRelations>>;
    growbeDashboardControllerFind(filter?: GrowbeDashboardFilter1, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<Array<GrowbeDashboardWithRelations>>>;
    growbeDashboardControllerFind(filter?: GrowbeDashboardFilter1, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<Array<GrowbeDashboardWithRelations>>>;
    /**
     * Get a filter list of GrowbeDashboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerFindById(id: string, filter?: GrowbeDashboardFilter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeDashboardWithRelations>;
    growbeDashboardControllerFindById(id: string, filter?: GrowbeDashboardFilter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeDashboardWithRelations>>;
    growbeDashboardControllerFindById(id: string, filter?: GrowbeDashboardFilter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeDashboardWithRelations>>;
    /**
     * Replace a instance of GrowbeDashboard
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerReplaceById(id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeDashboardControllerReplaceById(id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeDashboardControllerReplaceById(id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    /**
     * PATCH success count
     * @param where
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerUpdateAll(where?: {
        [key: string]: object;
    }, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<LoopbackCount>;
    growbeDashboardControllerUpdateAll(where?: {
        [key: string]: object;
    }, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<LoopbackCount>>;
    growbeDashboardControllerUpdateAll(where?: {
        [key: string]: object;
    }, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<LoopbackCount>>;
    /**
     * Update a instance of GrowbeDashboard
     * @param id
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeDashboardControllerUpdateById(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeDashboardControllerUpdateById(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeDashboardControllerUpdateById(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeDashboardControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeDashboardControllerService>;
}
