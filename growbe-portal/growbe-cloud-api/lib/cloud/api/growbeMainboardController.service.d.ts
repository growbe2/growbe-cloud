import { HttpClient, HttpHeaders, HttpResponse, HttpEvent, HttpParameterCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseDashboardElement } from '../model/models';
import { DashboardClockStateElement } from '../model/models';
import { DashboardGraphElement } from '../model/models';
import { DashboardLastValueElement } from '../model/models';
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
import { VirtualRelayPartial } from '../model/models';
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
    }): Observable<DashboardClockStateElement>;
    growbeMainboardControllerDashboardClockStateElement(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<DashboardClockStateElement>>;
    growbeMainboardControllerDashboardClockStateElement(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<DashboardClockStateElement>>;
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
    }): Observable<DashboardLastValueElement>;
    growbeMainboardControllerDashboardLastValueElement(observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<DashboardLastValueElement>>;
    growbeMainboardControllerDashboardLastValueElement(observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<DashboardLastValueElement>>;
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
     * @param fk
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerDelRelationModel_7(id: string, fk: string, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerDelRelationModel_7(id: string, fk: string, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerDelRelationModel_7(id: string, fk: string, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
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
    growbeMainboardControllerFindRelationModel_8(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerFindRelationModel_8(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerFindRelationModel_8(id: string, filter?: {
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
    growbeMainboardControllerFindRelationModel_9(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerFindRelationModel_9(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerFindRelationModel_9(id: string, filter?: {
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
    growbeMainboardControllerFindRelationModel_10(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerFindRelationModel_10(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerFindRelationModel_10(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * Get a filter list of GrowbeMainboard
     * @param id
     * @param filter
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerFindRelationModel_11(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerFindRelationModel_11(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerFindRelationModel_11(id: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
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
    growbeMainboardControllerGetRelationModel_12(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerGetRelationModel_12(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerGetRelationModel_12(id: string, fk: string, filter?: {
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
    growbeMainboardControllerGetRelationModel_13(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerGetRelationModel_13(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerGetRelationModel_13(id: string, fk: string, filter?: {
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
    growbeMainboardControllerGetRelationModel_14(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerGetRelationModel_14(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerGetRelationModel_14(id: string, fk: string, filter?: {
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
    growbeMainboardControllerGetRelationModel_15(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerGetRelationModel_15(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerGetRelationModel_15(id: string, fk: string, filter?: {
        [key: string]: object;
    }, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
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
    growbeMainboardControllerPutRelationModelById_16(id: string, fk: string, growbeModulePartial?: GrowbeModulePartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeModule>;
    growbeMainboardControllerPutRelationModelById_16(id: string, fk: string, growbeModulePartial?: GrowbeModulePartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeModule>>;
    growbeMainboardControllerPutRelationModelById_16(id: string, fk: string, growbeModulePartial?: GrowbeModulePartial, observe?: 'events', reportProgress?: boolean, options?: {
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
    growbeMainboardControllerPutRelationModelById_17(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeSensorValue>;
    growbeMainboardControllerPutRelationModelById_17(id: string, fk: string, requestBody?: {
        [key: string]: object;
    }, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeSensorValue>>;
    growbeMainboardControllerPutRelationModelById_17(id: string, fk: string, requestBody?: {
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
    growbeMainboardControllerPutRelationModelById_18(id: string, fk: string, growbeWarningPartial?: GrowbeWarningPartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<GrowbeWarning>;
    growbeMainboardControllerPutRelationModelById_18(id: string, fk: string, growbeWarningPartial?: GrowbeWarningPartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<GrowbeWarning>>;
    growbeMainboardControllerPutRelationModelById_18(id: string, fk: string, growbeWarningPartial?: GrowbeWarningPartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<GrowbeWarning>>;
    /**
     * Replace a instance of GrowbeMainboard
     * @param id
     * @param fk
     * @param virtualRelayPartial
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    growbeMainboardControllerPutRelationModelById_19(id: string, fk: string, virtualRelayPartial?: VirtualRelayPartial, observe?: 'body', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<any>;
    growbeMainboardControllerPutRelationModelById_19(id: string, fk: string, virtualRelayPartial?: VirtualRelayPartial, observe?: 'response', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpResponse<any>>;
    growbeMainboardControllerPutRelationModelById_19(id: string, fk: string, virtualRelayPartial?: VirtualRelayPartial, observe?: 'events', reportProgress?: boolean, options?: {
        httpHeaderAccept?: 'application/json';
    }): Observable<HttpEvent<any>>;
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
