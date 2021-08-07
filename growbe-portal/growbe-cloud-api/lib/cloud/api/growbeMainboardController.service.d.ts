import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDashboardElement } from '../model/models';
import { DashboardGraphElement } from '../model/models';
import { GraphDataConfig } from '../model/models';
import { GrowbeLogs } from '../model/models';
import { GrowbeMainboard } from '../model/models';
import { GrowbeMainboardExcludingId } from '../model/models';
import { GrowbeMainboardFilter } from '../model/models';
import { GrowbeMainboardFilter1 } from '../model/models';
import { GrowbeMainboardPartial } from '../model/models';
import { GrowbeMainboardPartialExcludingId } from '../model/models';
import { GrowbeMainboardWithRelations } from '../model/models';
import { GrowbeModule } from '../model/models';
import { GrowbeModulePartial } from '../model/models';
import { GrowbeModulePartialExcludingId } from '../model/models';
import { GrowbeRegisterRequest } from '../model/models';
import { GrowbeRegisterResponse } from '../model/models';
import { GrowbeSensorValue } from '../model/models';
import { GrowbeWarning } from '../model/models';
import { GrowbeWarningPartial } from '../model/models';
import { GrowbeWarningPartialExcludingId } from '../model/models';
import { LoopbackCount } from '../model/models';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
export declare class GrowbeMainboardControllerService {
    protected httpClient: HttpClient;
    protected basePath: string;
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    encoder: HttpParameterCodec;
    constructor(httpClient: HttpClient, basePath: string, configuration: Configuration);
    private addToHttpParams;
    private addToHttpParamsRecursive;
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerBaseDashboardElement(observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<BaseDashboardElement>;
    growbeMainboardControllerBaseDashboardElement(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<BaseDashboardElement>>;
    growbeMainboardControllerBaseDashboardElement(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<BaseDashboardElement>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param where
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<LoopbackCount>;
    growbeMainboardControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<LoopbackCount>>;
    growbeMainboardControllerCount(where?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<LoopbackCount>>;
    /**
     * Create a new instance of GrowbeMainboard
     * @param growbeMainboardExcludingId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerCreate(growbeMainboardExcludingId?: GrowbeMainboardExcludingId, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeMainboard>;
    growbeMainboardControllerCreate(growbeMainboardExcludingId?: GrowbeMainboardExcludingId, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeMainboard>>;
    growbeMainboardControllerCreate(growbeMainboardExcludingId?: GrowbeMainboardExcludingId, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeMainboard>>;
    /**
     * Create a new instance of GrowbeMainboard
     * @param id
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerCreateRelationModel(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeLogs>;
    growbeMainboardControllerCreateRelationModel(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeLogs>>;
    growbeMainboardControllerCreateRelationModel(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeLogs>>;
    /**
     * Create a new instance of GrowbeMainboard
     * @param id
     * @param growbeModulePartialExcludingId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerCreateRelationModel_1(id: string, growbeModulePartialExcludingId?: GrowbeModulePartialExcludingId, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerCreateRelationModel_1(id: string, growbeModulePartialExcludingId?: GrowbeModulePartialExcludingId, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerCreateRelationModel_1(id: string, growbeModulePartialExcludingId?: GrowbeModulePartialExcludingId, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModule>>;
    /**
     * Create a new instance of GrowbeMainboard
     * @param id
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerCreateRelationModel_2(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerCreateRelationModel_2(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerCreateRelationModel_2(id: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Create a new instance of GrowbeMainboard
     * @param id
     * @param growbeWarningPartialExcludingId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerCreateRelationModel_3(id: string, growbeWarningPartialExcludingId?: GrowbeWarningPartialExcludingId, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerCreateRelationModel_3(id: string, growbeWarningPartialExcludingId?: GrowbeWarningPartialExcludingId, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerCreateRelationModel_3(id: string, growbeWarningPartialExcludingId?: GrowbeWarningPartialExcludingId, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDashboardClockStateElement(observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<BaseDashboardElement>;
    growbeMainboardControllerDashboardClockStateElement(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<BaseDashboardElement>>;
    growbeMainboardControllerDashboardClockStateElement(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<BaseDashboardElement>>;
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDashboardGraphElement(observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<DashboardGraphElement>;
    growbeMainboardControllerDashboardGraphElement(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<DashboardGraphElement>>;
    growbeMainboardControllerDashboardGraphElement(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<DashboardGraphElement>>;
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDashboardLastValueElement(observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<BaseDashboardElement>;
    growbeMainboardControllerDashboardLastValueElement(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<BaseDashboardElement>>;
    growbeMainboardControllerDashboardLastValueElement(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<BaseDashboardElement>>;
    /**
     * Delete a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDelRelationModel(id: string, fk: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeLogs>;
    growbeMainboardControllerDelRelationModel(id: string, fk: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeLogs>>;
    growbeMainboardControllerDelRelationModel(id: string, fk: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeLogs>>;
    /**
     * Delete a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDelRelationModel_4(id: string, fk: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerDelRelationModel_4(id: string, fk: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerDelRelationModel_4(id: string, fk: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModule>>;
    /**
     * Delete a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDelRelationModel_5(id: string, fk: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerDelRelationModel_5(id: string, fk: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerDelRelationModel_5(id: string, fk: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Delete a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDelRelationModel_6(id: string, fk: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerDelRelationModel_6(id: string, fk: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerDelRelationModel_6(id: string, fk: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * Delete a instance of GrowbeMainboard
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDeleteById(id: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerDeleteById(id: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerDeleteById(id: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFind(filter?: GrowbeMainboardFilter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<Array<GrowbeMainboardWithRelations>>;
    growbeMainboardControllerFind(filter?: GrowbeMainboardFilter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<Array<GrowbeMainboardWithRelations>>>;
    growbeMainboardControllerFind(filter?: GrowbeMainboardFilter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<Array<GrowbeMainboardWithRelations>>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindById(id: string, filter?: GrowbeMainboardFilter1, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeMainboardWithRelations>;
    growbeMainboardControllerFindById(id: string, filter?: GrowbeMainboardFilter1, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeMainboardWithRelations>>;
    growbeMainboardControllerFindById(id: string, filter?: GrowbeMainboardFilter1, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeMainboardWithRelations>>;
    /**
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindGrowbeOrganisation(id: string, filter?: GrowbeMainboardFilter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerFindGrowbeOrganisation(id: string, filter?: GrowbeMainboardFilter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerFindGrowbeOrganisation(id: string, filter?: GrowbeMainboardFilter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param where
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindGrowbeOrganisationCount(id: string, where?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerFindGrowbeOrganisationCount(id: string, where?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerFindGrowbeOrganisationCount(id: string, where?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindGrowbeUser(id: string, filter?: GrowbeMainboardFilter, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerFindGrowbeUser(id: string, filter?: GrowbeMainboardFilter, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerFindGrowbeUser(id: string, filter?: GrowbeMainboardFilter, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param where
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindGrowbeUserCount(id: string, where?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerFindGrowbeUserCount(id: string, where?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerFindGrowbeUserCount(id: string, where?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindRelationModel(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeLogs>;
    growbeMainboardControllerFindRelationModel(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeLogs>>;
    growbeMainboardControllerFindRelationModel(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeLogs>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindRelationModel_7(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerFindRelationModel_7(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerFindRelationModel_7(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModule>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindRelationModel_8(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerFindRelationModel_8(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerFindRelationModel_8(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindRelationModel_9(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerFindRelationModel_9(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerFindRelationModel_9(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param fk
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerGetRelationModel(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeLogs>;
    growbeMainboardControllerGetRelationModel(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeLogs>>;
    growbeMainboardControllerGetRelationModel(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeLogs>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param fk
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerGetRelationModel_10(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerGetRelationModel_10(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerGetRelationModel_10(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModule>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param fk
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerGetRelationModel_11(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerGetRelationModel_11(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerGetRelationModel_11(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param fk
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerGetRelationModel_12(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerGetRelationModel_12(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerGetRelationModel_12(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerGraphDataConfig(observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GraphDataConfig>;
    growbeMainboardControllerGraphDataConfig(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GraphDataConfig>>;
    growbeMainboardControllerGraphDataConfig(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GraphDataConfig>>;
    /**
     * Replace a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerPutRelationModelById(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeLogs>;
    growbeMainboardControllerPutRelationModelById(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeLogs>>;
    growbeMainboardControllerPutRelationModelById(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeLogs>>;
    /**
     * Replace a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param growbeModulePartial
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerPutRelationModelById_13(id: string, fk: string, growbeModulePartial?: GrowbeModulePartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerPutRelationModelById_13(id: string, fk: string, growbeModulePartial?: GrowbeModulePartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerPutRelationModelById_13(id: string, fk: string, growbeModulePartial?: GrowbeModulePartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeModule>>;
    /**
     * Replace a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param requestBody
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerPutRelationModelById_14(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerPutRelationModelById_14(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerPutRelationModelById_14(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeSensorValue>>;
    /**
     * Replace a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param growbeWarningPartial
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerPutRelationModelById_15(id: string, fk: string, growbeWarningPartial?: GrowbeWarningPartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerPutRelationModelById_15(id: string, fk: string, growbeWarningPartial?: GrowbeWarningPartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerPutRelationModelById_15(id: string, fk: string, growbeWarningPartial?: GrowbeWarningPartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * @param growbeRegisterRequest
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerRegisterGrowbe(growbeRegisterRequest?: GrowbeRegisterRequest, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeRegisterResponse>;
    growbeMainboardControllerRegisterGrowbe(growbeRegisterRequest?: GrowbeRegisterRequest, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeRegisterResponse>>;
    growbeMainboardControllerRegisterGrowbe(growbeRegisterRequest?: GrowbeRegisterRequest, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeRegisterResponse>>;
    /**
     * @param id
     * @param orgId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerRegisterOrganisation(id: string, orgId: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerRegisterOrganisation(id: string, orgId: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerRegisterOrganisation(id: string, orgId: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * Replace a instance of GrowbeMainboard
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerReplaceById(id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerReplaceById(id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerReplaceById(id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerSetGrowbeConfig(id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerSetGrowbeConfig(id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerSetGrowbeConfig(id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerSetGrowbeRTC(id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerSetGrowbeRTC(id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerSetGrowbeRTC(id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * @param id
     * @param body
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerSetGrowbeSync(id: string, body?: object, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<any>;
    growbeMainboardControllerSetGrowbeSync(id: string, body?: object, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerSetGrowbeSync(id: string, body?: object, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: undefined;
    }): Observable<HttpEvent<any>>;
    /**
     * PATCH success count
     * @param where
     * @param growbeMainboardPartial
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerUpdateAll(where?: {
        [key: string]: object;
    }, growbeMainboardPartial?: GrowbeMainboardPartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<LoopbackCount>;
    growbeMainboardControllerUpdateAll(where?: {
        [key: string]: object;
    }, growbeMainboardPartial?: GrowbeMainboardPartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<LoopbackCount>>;
    growbeMainboardControllerUpdateAll(where?: {
        [key: string]: object;
    }, growbeMainboardPartial?: GrowbeMainboardPartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<LoopbackCount>>;
    /**
     * Update a instance of GrowbeMainboard
     * @param id
     * @param growbeMainboardPartialExcludingId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerUpdateById(id: string, growbeMainboardPartialExcludingId?: GrowbeMainboardPartialExcludingId, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerUpdateById(id: string, growbeMainboardPartialExcludingId?: GrowbeMainboardPartialExcludingId, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerUpdateById(id: string, growbeMainboardPartialExcludingId?: GrowbeMainboardPartialExcludingId, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GrowbeMainboardControllerService, [null, { optional: true; }, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GrowbeMainboardControllerService>;
}
