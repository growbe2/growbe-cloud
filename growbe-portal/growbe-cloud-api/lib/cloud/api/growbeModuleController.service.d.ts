import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrowbeModule } from '../model/models';
import { GrowbeModuleExcludingId } from '../model/models';
import { GrowbeModuleFilter } from '../model/models';
import { GrowbeModuleFilter1 } from '../model/models';
import { GrowbeModulePartial } from '../model/models';
import { GrowbeModulePartialExcludingId } from '../model/models';
import { GrowbeModuleWithRelations } from '../model/models';
import { GrowbeSensorValue } from '../model/models';
import { LoopbackCount } from '../model/models';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeModuleControllerService {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string, configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * Get a filter list of GrowbeModule
     * @param where
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<LoopbackCount>;
    growbeModuleControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<LoopbackCount>>;
    growbeModuleControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<LoopbackCount>>;
    /**
     * Create a new instance of GrowbeModule
     * @param growbeModuleExcludingId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerCreate(growbeModuleExcludingId?: GrowbeModuleExcludingId, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeModuleControllerCreate(growbeModuleExcludingId?: GrowbeModuleExcludingId, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeModuleControllerCreate(growbeModuleExcludingId?: GrowbeModuleExcludingId, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModule>>;
    /**
     * Create a new instance of GrowbeModule
     * @param id
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerCreateRelationModel(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeModuleControllerCreateRelationModel(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeModuleControllerCreateRelationModel(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Delete a instance of GrowbeModule
     * @param id
     * @param fk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerDelRelationModel(id: string, fk: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeModuleControllerDelRelationModel(id: string, fk: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeModuleControllerDelRelationModel(id: string, fk: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Delete a instance of GrowbeModule
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerDeleteById(id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeModuleControllerDeleteById(id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeModuleControllerDeleteById(id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    /**
     * Get a filter list of GrowbeModule
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerFind(filter?: GrowbeModuleFilter1, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<Array<GrowbeModuleWithRelations>>;
    growbeModuleControllerFind(filter?: GrowbeModuleFilter1, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<Array<GrowbeModuleWithRelations>>>;
    growbeModuleControllerFind(filter?: GrowbeModuleFilter1, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<Array<GrowbeModuleWithRelations>>>;
    /**
     * Get a filter list of GrowbeModule
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerFindById(id: string, filter?: GrowbeModuleFilter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModuleWithRelations>;
    growbeModuleControllerFindById(id: string, filter?: GrowbeModuleFilter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModuleWithRelations>>;
    growbeModuleControllerFindById(id: string, filter?: GrowbeModuleFilter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModuleWithRelations>>;
    /**
     * Get a filter list of GrowbeModule
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerFindRelationModel(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeModuleControllerFindRelationModel(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeModuleControllerFindRelationModel(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Get a filter list of GrowbeModule
     * @param id
     * @param fk
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerGetRelationModel(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeModuleControllerGetRelationModel(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeModuleControllerGetRelationModel(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Replace a instance of GrowbeModule
     * @param id
     * @param fk
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerPutRelationModelById(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeModuleControllerPutRelationModelById(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeModuleControllerPutRelationModelById(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Replace a instance of GrowbeModule
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerReplaceById(id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeModuleControllerReplaceById(id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeModuleControllerReplaceById(id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    /**
     * @param boardId
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerSetConfig(boardId: string, id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeModuleControllerSetConfig(boardId: string, id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeModuleControllerSetConfig(boardId: string, id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * PATCH success count
     * @param where
     * @param growbeModulePartial
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerUpdateAll(where?: {
        [key: string]: object;
    }, growbeModulePartial?: GrowbeModulePartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<LoopbackCount>;
    growbeModuleControllerUpdateAll(where?: {
        [key: string]: object;
    }, growbeModulePartial?: GrowbeModulePartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<LoopbackCount>>;
    growbeModuleControllerUpdateAll(where?: {
        [key: string]: object;
    }, growbeModulePartial?: GrowbeModulePartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<LoopbackCount>>;
    /**
     * Update a instance of GrowbeModule
     * @param id
     * @param growbeModulePartialExcludingId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeModuleControllerUpdateById(id: string, growbeModulePartialExcludingId?: GrowbeModulePartialExcludingId, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeModuleControllerUpdateById(id: string, growbeModulePartialExcludingId?: GrowbeModulePartialExcludingId, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeModuleControllerUpdateById(id: string, growbeModulePartialExcludingId?: GrowbeModulePartialExcludingId, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeModuleControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeModuleControllerService>;
}
