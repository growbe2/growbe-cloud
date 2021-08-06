(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@growbe2/ngx-cloud-api', ['exports', '@angular/core', '@angular/common/http'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.growbe2 = global.growbe2 || {}, global.growbe2['ngx-cloud-api'] = {}), global.ng.core, global.ng.common.http));
}(this, (function (exports, i0, i1) { 'use strict';

    /**
     * Custom HttpParameterCodec
     * Workaround for https://github.com/angular/angular/issues/18261
     */
    var CustomHttpParameterCodec = /** @class */ (function () {
        function CustomHttpParameterCodec() {
        }
        CustomHttpParameterCodec.prototype.encodeKey = function (k) {
            return encodeURIComponent(k);
        };
        CustomHttpParameterCodec.prototype.encodeValue = function (v) {
            return encodeURIComponent(v);
        };
        CustomHttpParameterCodec.prototype.decodeKey = function (k) {
            return decodeURIComponent(k);
        };
        CustomHttpParameterCodec.prototype.decodeValue = function (v) {
            return decodeURIComponent(v);
        };
        return CustomHttpParameterCodec;
    }());

    var BASE_PATH = new i0.InjectionToken('basePath');
    var COLLECTION_FORMATS = {
        'csv': ',',
        'tsv': '   ',
        'ssv': ' ',
        'pipes': '|'
    };

    var Configuration = /** @class */ (function () {
        function Configuration(configurationParameters) {
            var _this = this;
            if (configurationParameters === void 0) { configurationParameters = {}; }
            this.apiKeys = configurationParameters.apiKeys;
            this.username = configurationParameters.username;
            this.password = configurationParameters.password;
            this.accessToken = configurationParameters.accessToken;
            this.basePath = configurationParameters.basePath;
            this.withCredentials = configurationParameters.withCredentials;
            this.encoder = configurationParameters.encoder;
            if (configurationParameters.credentials) {
                this.credentials = configurationParameters.credentials;
            }
            else {
                this.credentials = {};
            }
            // init default bearerAuth credential
            if (!this.credentials['bearerAuth']) {
                this.credentials['bearerAuth'] = function () {
                    return typeof _this.accessToken === 'function'
                        ? _this.accessToken()
                        : _this.accessToken;
                };
            }
        }
        /**
         * Select the correct content-type to use for a request.
         * Uses {@link Configuration#isJsonMime} to determine the correct content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param contentTypes - the array of content types that are available for selection
         * @returns the selected content-type or <code>undefined</code> if no selection could be made.
         */
        Configuration.prototype.selectHeaderContentType = function (contentTypes) {
            var _this = this;
            if (contentTypes.length === 0) {
                return undefined;
            }
            var type = contentTypes.find(function (x) { return _this.isJsonMime(x); });
            if (type === undefined) {
                return contentTypes[0];
            }
            return type;
        };
        /**
         * Select the correct accept content-type to use for a request.
         * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
         * If no content type is found return the first found type if the contentTypes is not empty
         * @param accepts - the array of content types that are available for selection.
         * @returns the selected content-type or <code>undefined</code> if no selection could be made.
         */
        Configuration.prototype.selectHeaderAccept = function (accepts) {
            var _this = this;
            if (accepts.length === 0) {
                return undefined;
            }
            var type = accepts.find(function (x) { return _this.isJsonMime(x); });
            if (type === undefined) {
                return accepts[0];
            }
            return type;
        };
        /**
         * Check if the given MIME is a JSON MIME.
         * JSON MIME examples:
         *   application/json
         *   application/json; charset=UTF8
         *   APPLICATION/JSON
         *   application/vnd.company+json
         * @param mime - MIME (Multipurpose Internet Mail Extensions)
         * @return True if the given MIME is JSON, false otherwise.
         */
        Configuration.prototype.isJsonMime = function (mime) {
            var jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
            return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
        };
        Configuration.prototype.lookupCredential = function (key) {
            var value = this.credentials[key];
            return typeof value === 'function'
                ? value()
                : value;
        };
        return Configuration;
    }());

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
    var GrowbeDashboardControllerService = /** @class */ (function () {
        function GrowbeDashboardControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeDashboardControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeDashboardControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerCount = function (where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/dashboards/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerCreate = function (requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/dashboards", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeDashboardControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/dashboards/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerFind = function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/dashboards", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerFindById = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeDashboardControllerFindById.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/dashboards/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerReplaceById = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeDashboardControllerReplaceById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/dashboards/" + encodeURIComponent(String(id)), body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerUpdateAll = function (where, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/dashboards", requestBody, {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeDashboardControllerService.prototype.growbeDashboardControllerUpdateById = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeDashboardControllerUpdateById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/dashboards/" + encodeURIComponent(String(id)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeDashboardControllerService;
    }());
    GrowbeDashboardControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeDashboardControllerService_Factory() { return new GrowbeDashboardControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeDashboardControllerService, providedIn: "root" });
    GrowbeDashboardControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeDashboardControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeMainboardControllerService = /** @class */ (function () {
        function GrowbeMainboardControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeMainboardControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeMainboardControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerBaseDashboardElement = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/model/baseDashboardElement", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerCount = function (where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerCreate = function (growbeMainboardExcludingId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbes", growbeMainboardExcludingId, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerCreateRelationModel = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerCreateRelationModel.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeLogs", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerCreateRelationModel_1 = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerCreateRelationModel_1.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeModules", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerCreateRelationModel_2 = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerCreateRelationModel_2.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeSensorValues", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerCreateRelationModel_3 = function (id, growbeWarningPartialExcludingId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerCreateRelationModel_3.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeWarnings", growbeWarningPartialExcludingId, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDashboardClockStateElement = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/model/dashboardClockStateElement", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDashboardGraphElement = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/model/dashboardGraphElement", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDashboardLastValueElement = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/model/dashboardLastValueElement", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDelRelationModel = function (id, fk, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerDelRelationModel.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerDelRelationModel.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeLogs/" + encodeURIComponent(String(fk)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDelRelationModel_4 = function (id, fk, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerDelRelationModel_4.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerDelRelationModel_4.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeModules/" + encodeURIComponent(String(fk)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDelRelationModel_5 = function (id, fk, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerDelRelationModel_5.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerDelRelationModel_5.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeSensorValues/" + encodeURIComponent(String(fk)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDelRelationModel_6 = function (id, fk, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerDelRelationModel_6.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerDelRelationModel_6.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeWarnings/" + encodeURIComponent(String(fk)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFind = function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindById = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindById.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindGrowbeOrganisation = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindGrowbeOrganisation.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/organisations/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindGrowbeOrganisationCount = function (id, where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindGrowbeOrganisationCount.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/organisations/" + encodeURIComponent(String(id)) + "/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindGrowbeUser = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindGrowbeUser.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/user/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindGrowbeUserCount = function (id, where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindGrowbeUserCount.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/user/" + encodeURIComponent(String(id)) + "/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindRelationModel = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindRelationModel.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeLogs", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindRelationModel_7 = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindRelationModel_7.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeModules", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindRelationModel_8 = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindRelationModel_8.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeSensorValues", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerFindRelationModel_9 = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerFindRelationModel_9.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeWarnings", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerGetRelationModel = function (id, fk, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerGetRelationModel.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerGetRelationModel.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeLogs/" + encodeURIComponent(String(fk)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerGetRelationModel_10 = function (id, fk, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerGetRelationModel_10.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerGetRelationModel_10.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeModules/" + encodeURIComponent(String(fk)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerGetRelationModel_11 = function (id, fk, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerGetRelationModel_11.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerGetRelationModel_11.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeSensorValues/" + encodeURIComponent(String(fk)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerGetRelationModel_12 = function (id, fk, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerGetRelationModel_12.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerGetRelationModel_12.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeWarnings/" + encodeURIComponent(String(fk)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerGraphDataConfig = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/model/graphDataConfig", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerPutRelationModelById = function (id, fk, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerPutRelationModelById.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerPutRelationModelById.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeLogs/" + encodeURIComponent(String(fk)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerPutRelationModelById_13 = function (id, fk, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerPutRelationModelById_13.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerPutRelationModelById_13.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeModules/" + encodeURIComponent(String(fk)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerPutRelationModelById_14 = function (id, fk, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerPutRelationModelById_14.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerPutRelationModelById_14.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeSensorValues/" + encodeURIComponent(String(fk)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerPutRelationModelById_15 = function (id, fk, growbeWarningPartial, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerPutRelationModelById_15.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeMainboardControllerPutRelationModelById_15.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/growbeWarnings/" + encodeURIComponent(String(fk)), growbeWarningPartial, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerRegisterGrowbe = function (growbeRegisterRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbe/register", growbeRegisterRequest, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerRegisterOrganisation = function (id, orgId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerRegisterOrganisation.');
            }
            if (orgId === null || orgId === undefined) {
                throw new Error('Required parameter orgId was null or undefined when calling growbeMainboardControllerRegisterOrganisation.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)) + "/register/org/" + encodeURIComponent(String(orgId)), null, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerReplaceById = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerReplaceById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)), body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerSetGrowbeConfig = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerSetGrowbeConfig.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbe/" + encodeURIComponent(String(id)) + "/config", body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerSetGrowbeRTC = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerSetGrowbeRTC.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbe/" + encodeURIComponent(String(id)) + "/rtc", body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerSetGrowbeSync = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerSetGrowbeSync.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbe/" + encodeURIComponent(String(id)) + "/sync", body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerUpdateAll = function (where, growbeMainboardPartial, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbes", growbeMainboardPartial, {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeMainboardControllerService.prototype.growbeMainboardControllerUpdateById = function (id, growbeMainboardPartialExcludingId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeMainboardControllerUpdateById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbes/" + encodeURIComponent(String(id)), growbeMainboardPartialExcludingId, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeMainboardControllerService;
    }());
    GrowbeMainboardControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeMainboardControllerService_Factory() { return new GrowbeMainboardControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeMainboardControllerService, providedIn: "root" });
    GrowbeMainboardControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeMainboardControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeModuleControllerService = /** @class */ (function () {
        function GrowbeModuleControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeModuleControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeModuleControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerCount = function (where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModules/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerCreate = function (requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModules", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerCreateRelationModel = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerCreateRelationModel.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)) + "/growbeSensorValues", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerDelRelationModel = function (id, fk, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerDelRelationModel.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeModuleControllerDelRelationModel.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)) + "/growbeSensorValues/" + encodeURIComponent(String(fk)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerFind = function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModules", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerFindById = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerFindById.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerFindRelationModel = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerFindRelationModel.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)) + "/growbeSensorValues", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerGetRelationModel = function (id, fk, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerGetRelationModel.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeModuleControllerGetRelationModel.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)) + "/growbeSensorValues/" + encodeURIComponent(String(fk)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerPutRelationModelById = function (id, fk, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerPutRelationModelById.');
            }
            if (fk === null || fk === undefined) {
                throw new Error('Required parameter fk was null or undefined when calling growbeModuleControllerPutRelationModelById.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)) + "/growbeSensorValues/" + encodeURIComponent(String(fk)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerReplaceById = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerReplaceById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)), body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerSetConfig = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerSetConfig.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)) + "/config", body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerUpdateAll = function (where, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbeModules", requestBody, {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleControllerService.prototype.growbeModuleControllerUpdateById = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleControllerUpdateById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbeModules/" + encodeURIComponent(String(id)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeModuleControllerService;
    }());
    GrowbeModuleControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeModuleControllerService_Factory() { return new GrowbeModuleControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeModuleControllerService, providedIn: "root" });
    GrowbeModuleControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeModuleControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeModuleDefControllerService = /** @class */ (function () {
        function GrowbeModuleDefControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeModuleDefControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeModuleDefControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerAddHardwareAlarm = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleDefControllerAddHardwareAlarm.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModuleDefs/" + encodeURIComponent(String(id)) + "/addAlarm", body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerCount = function (where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModuleDefs/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerCreate = function (growbeModuleDef, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModuleDefs", growbeModuleDef, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleDefControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbeModuleDefs/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerFind = function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModuleDefs", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerFindById = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleDefControllerFindById.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeModuleDefs/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerOverrideModuleDef = function (overrideModuleDefRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModuleDefs/override", overrideModuleDefRequest, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerRemoveHardwareAlarm = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleDefControllerRemoveHardwareAlarm.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeModuleDefs/" + encodeURIComponent(String(id)) + "/removeAlarm", body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerReplaceById = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleDefControllerReplaceById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbeModuleDefs/" + encodeURIComponent(String(id)), body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerUpdateAll = function (where, growbeModuleDefPartial, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbeModuleDefs", growbeModuleDefPartial, {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleDefControllerService.prototype.growbeModuleDefControllerUpdateById = function (id, growbeModuleDefPartial, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeModuleDefControllerUpdateById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbeModuleDefs/" + encodeURIComponent(String(id)), growbeModuleDefPartial, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeModuleDefControllerService;
    }());
    GrowbeModuleDefControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeModuleDefControllerService_Factory() { return new GrowbeModuleDefControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeModuleDefControllerService, providedIn: "root" });
    GrowbeModuleDefControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeModuleDefControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeModuleGraphControllerService = /** @class */ (function () {
        function GrowbeModuleGraphControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeModuleGraphControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeModuleGraphControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeModuleGraphControllerService.prototype.growbeModuleGraphControllerGetGraph = function (graphModuleRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbe/graph", graphModuleRequest, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeModuleGraphControllerService.prototype.growbeModuleGraphControllerGetLastValue = function (moduleDataRequest, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbe/one", moduleDataRequest, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeModuleGraphControllerService;
    }());
    GrowbeModuleGraphControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeModuleGraphControllerService_Factory() { return new GrowbeModuleGraphControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeModuleGraphControllerService, providedIn: "root" });
    GrowbeModuleGraphControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeModuleGraphControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeSensorValueControllerService = /** @class */ (function () {
        function GrowbeSensorValueControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeSensorValueControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeSensorValueControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerCount = function (where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeSensorValues/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerCreate = function (requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeSensorValues", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeSensorValueControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbeSensorValues/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerFind = function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeSensorValues", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerFindById = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeSensorValueControllerFindById.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeSensorValues/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerReplaceById = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeSensorValueControllerReplaceById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/growbeSensorValues/" + encodeURIComponent(String(id)), body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerUpdateAll = function (where, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbeSensorValues", requestBody, {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeSensorValueControllerService.prototype.growbeSensorValueControllerUpdateById = function (id, requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeSensorValueControllerUpdateById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/growbeSensorValues/" + encodeURIComponent(String(id)), requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeSensorValueControllerService;
    }());
    GrowbeSensorValueControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeSensorValueControllerService_Factory() { return new GrowbeSensorValueControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeSensorValueControllerService, providedIn: "root" });
    GrowbeSensorValueControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeSensorValueControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeStreamControllerService = /** @class */ (function () {
        function GrowbeStreamControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeStreamControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeStreamControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeStreamControllerService.prototype.growbeStreamControllerCreateStream = function (requestBody, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/growbeStreams", requestBody, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeStreamControllerService.prototype.growbeStreamControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeStreamControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/growbeStreams/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeStreamControllerService.prototype.growbeStreamControllerGetLiveStream = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeStreamControllerGetLiveStream.');
            }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/growbeStreams/" + encodeURIComponent(String(id)) + "/live", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeStreamControllerService;
    }());
    GrowbeStreamControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeStreamControllerService_Factory() { return new GrowbeStreamControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeStreamControllerService, providedIn: "root" });
    GrowbeStreamControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeStreamControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var GrowbeWarningControllerService = /** @class */ (function () {
        function GrowbeWarningControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        GrowbeWarningControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        GrowbeWarningControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerCount = function (where, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/warnings/count", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerCreate = function (growbeWarningExcludingId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.post(this.configuration.basePath + "/warnings", growbeWarningExcludingId, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerDeleteById = function (id, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeWarningControllerDeleteById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.delete(this.configuration.basePath + "/warnings/" + encodeURIComponent(String(id)), {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerFind = function (filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/warnings", {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerFindById = function (id, filter, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeWarningControllerFindById.');
            }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (filter !== undefined && filter !== null) {
                queryParameters = this.addToHttpParams(queryParameters, filter, 'filter');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/warnings/" + encodeURIComponent(String(id)), {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerReplaceById = function (id, body, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeWarningControllerReplaceById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.put(this.configuration.basePath + "/warnings/" + encodeURIComponent(String(id)), body, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerUpdateAll = function (where, growbeWarningPartial, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var queryParameters = new i1.HttpParams({ encoder: this.encoder });
            if (where !== undefined && where !== null) {
                queryParameters = this.addToHttpParams(queryParameters, where, 'where');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/warnings", growbeWarningPartial, {
                params: queryParameters,
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        GrowbeWarningControllerService.prototype.growbeWarningControllerUpdateById = function (id, growbeWarningPartialExcludingId, observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            if (id === null || id === undefined) {
                throw new Error('Required parameter id was null or undefined when calling growbeWarningControllerUpdateById.');
            }
            var headers = this.defaultHeaders;
            var credential;
            // authentication (bearerAuth) required
            credential = this.configuration.lookupCredential('bearerAuth');
            if (credential) {
                headers = headers.set('Authorization', 'Bearer ' + credential);
            }
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            // to determine the Content-Type header
            var consumes = [
                'application/json'
            ];
            var httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
            if (httpContentTypeSelected !== undefined) {
                headers = headers.set('Content-Type', httpContentTypeSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.patch(this.configuration.basePath + "/warnings/" + encodeURIComponent(String(id)), growbeWarningPartialExcludingId, {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return GrowbeWarningControllerService;
    }());
    GrowbeWarningControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function GrowbeWarningControllerService_Factory() { return new GrowbeWarningControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: GrowbeWarningControllerService, providedIn: "root" });
    GrowbeWarningControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    GrowbeWarningControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

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
    var PingControllerService = /** @class */ (function () {
        function PingControllerService(httpClient, basePath, configuration) {
            this.httpClient = httpClient;
            this.basePath = 'http://localhost/api';
            this.defaultHeaders = new i1.HttpHeaders();
            this.configuration = new Configuration();
            if (configuration) {
                this.configuration = configuration;
            }
            if (typeof this.configuration.basePath !== 'string') {
                if (typeof basePath !== 'string') {
                    basePath = this.basePath;
                }
                this.configuration.basePath = basePath;
            }
            this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
        }
        PingControllerService.prototype.addToHttpParams = function (httpParams, value, key) {
            if (typeof value === "object" && value instanceof Date === false) {
                httpParams = this.addToHttpParamsRecursive(httpParams, value);
            }
            else {
                httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
            }
            return httpParams;
        };
        PingControllerService.prototype.addToHttpParamsRecursive = function (httpParams, value, key) {
            var _this = this;
            if (value == null) {
                return httpParams;
            }
            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    value.forEach(function (elem) { return httpParams = _this.addToHttpParamsRecursive(httpParams, elem, key); });
                }
                else if (value instanceof Date) {
                    if (key != null) {
                        httpParams = httpParams.append(key, value.toISOString().substr(0, 10));
                    }
                    else {
                        throw Error("key may not be null if value is Date");
                    }
                }
                else {
                    Object.keys(value).forEach(function (k) { return httpParams = _this.addToHttpParamsRecursive(httpParams, value[k], key != null ? key + "." + k : k); });
                }
            }
            else if (key != null) {
                httpParams = httpParams.append(key, value);
            }
            else {
                throw Error("key may not be null if value is not object or array");
            }
            return httpParams;
        };
        PingControllerService.prototype.pingControllerPing = function (observe, reportProgress, options) {
            if (observe === void 0) { observe = 'body'; }
            if (reportProgress === void 0) { reportProgress = false; }
            var headers = this.defaultHeaders;
            var httpHeaderAcceptSelected = options && options.httpHeaderAccept;
            if (httpHeaderAcceptSelected === undefined) {
                // to determine the Accept header
                var httpHeaderAccepts = [
                    'application/json'
                ];
                httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
            }
            if (httpHeaderAcceptSelected !== undefined) {
                headers = headers.set('Accept', httpHeaderAcceptSelected);
            }
            var responseType = 'json';
            if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
                responseType = 'text';
            }
            return this.httpClient.get(this.configuration.basePath + "/ping", {
                responseType: responseType,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            });
        };
        return PingControllerService;
    }());
    PingControllerService.ɵprov = i0.ɵɵdefineInjectable({ factory: function PingControllerService_Factory() { return new PingControllerService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(Configuration, 8)); }, token: PingControllerService, providedIn: "root" });
    PingControllerService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    PingControllerService.ctorParameters = function () { return [
        { type: i1.HttpClient },
        { type: String, decorators: [{ type: i0.Optional }, { type: i0.Inject, args: [BASE_PATH,] }] },
        { type: Configuration, decorators: [{ type: i0.Optional }] }
    ]; };

    var APIS = [GrowbeDashboardControllerService, GrowbeMainboardControllerService, GrowbeModuleControllerService, GrowbeModuleDefControllerService, GrowbeModuleGraphControllerService, GrowbeSensorValueControllerService, GrowbeStreamControllerService, GrowbeWarningControllerService, PingControllerService];

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
    (function (BaseDashboardElement) {
        BaseDashboardElement.TypeEnum = {
            Graph: 'graph',
            Average: 'average',
            Lastread: 'lastread',
            Clock: 'clock'
        };
    })(exports.BaseDashboardElement || (exports.BaseDashboardElement = {}));

    (function (DashboardGraphElement) {
        DashboardGraphElement.TypeEnum = {
            Graph: 'graph',
            Average: 'average',
            Lastread: 'lastread',
            Clock: 'clock'
        };
        DashboardGraphElement.GraphTypeEnum = {
            Line: 'line',
            BarVertical: 'bar-vertical'
        };
    })(exports.DashboardGraphElement || (exports.DashboardGraphElement = {}));

    (function (GraphModuleRequest) {
        GraphModuleRequest.LastXUnitEnum = {
            Month: 'Month',
            Hours: 'Hours',
            Minutes: 'Minutes',
            Day: 'Day',
            Date: 'Date'
        };
    })(exports.GraphModuleRequest || (exports.GraphModuleRequest = {}));

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
    (function (GroupingDataRequest) {
        GroupingDataRequest.BaseGroupEnum = {
            Minute: 'minute',
            Hour: 'hour',
            DayOfYear: 'dayOfYear',
            Year: 'year'
        };
        GroupingDataRequest.IntervalUnitEnum = {
            Minute: 'minute',
            Hour: 'hour',
            DayOfYear: 'dayOfYear',
            Year: 'year'
        };
    })(exports.GroupingDataRequest || (exports.GroupingDataRequest = {}));

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
    (function (GrowbeLogs) {
        GrowbeLogs.SeverityEnum = {
            _0: '0',
            _1: '1',
            _2: '2'
        };
        GrowbeLogs.GroupEnum = {
            Mainboard: 'mainboard',
            Modules: 'modules'
        };
        GrowbeLogs.TypeEnum = {
            Module: 'module',
            ModuleConfig: 'module_config',
            Connection: 'connection',
            NewWarning: 'new_warning',
            UpdateRtc: 'update_rtc',
            SyncRequest: 'sync_request',
            GrowbeConfig: 'growbe_config',
            Alarm: 'alarm'
        };
    })(exports.GrowbeLogs || (exports.GrowbeLogs = {}));

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
    (function (GrowbeLogsPartial) {
        GrowbeLogsPartial.SeverityEnum = {
            _0: '0',
            _1: '1',
            _2: '2'
        };
        GrowbeLogsPartial.GroupEnum = {
            Mainboard: 'mainboard',
            Modules: 'modules'
        };
        GrowbeLogsPartial.TypeEnum = {
            Module: 'module',
            ModuleConfig: 'module_config',
            Connection: 'connection',
            NewWarning: 'new_warning',
            UpdateRtc: 'update_rtc',
            SyncRequest: 'sync_request',
            GrowbeConfig: 'growbe_config',
            Alarm: 'alarm'
        };
    })(exports.GrowbeLogsPartial || (exports.GrowbeLogsPartial = {}));

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
    (function (GrowbeLogsPartialExcludingId) {
        GrowbeLogsPartialExcludingId.SeverityEnum = {
            _0: '0',
            _1: '1',
            _2: '2'
        };
        GrowbeLogsPartialExcludingId.GroupEnum = {
            Mainboard: 'mainboard',
            Modules: 'modules'
        };
        GrowbeLogsPartialExcludingId.TypeEnum = {
            Module: 'module',
            ModuleConfig: 'module_config',
            Connection: 'connection',
            NewWarning: 'new_warning',
            UpdateRtc: 'update_rtc',
            SyncRequest: 'sync_request',
            GrowbeConfig: 'growbe_config',
            Alarm: 'alarm'
        };
    })(exports.GrowbeLogsPartialExcludingId || (exports.GrowbeLogsPartialExcludingId = {}));

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
    (function (GrowbeLogsWithRelations) {
        GrowbeLogsWithRelations.SeverityEnum = {
            _0: '0',
            _1: '1',
            _2: '2'
        };
        GrowbeLogsWithRelations.GroupEnum = {
            Mainboard: 'mainboard',
            Modules: 'modules'
        };
        GrowbeLogsWithRelations.TypeEnum = {
            Module: 'module',
            ModuleConfig: 'module_config',
            Connection: 'connection',
            NewWarning: 'new_warning',
            UpdateRtc: 'update_rtc',
            SyncRequest: 'sync_request',
            GrowbeConfig: 'growbe_config',
            Alarm: 'alarm'
        };
    })(exports.GrowbeLogsWithRelations || (exports.GrowbeLogsWithRelations = {}));

    (function (GrowbeRegisterResponse) {
        GrowbeRegisterResponse.StateEnum = {
            BeathUnregister: 'BEATH_UNREGISTER',
            UnbeathRegister: 'UNBEATH_REGISTER',
            Unregister: 'UNREGISTER',
            Register: 'REGISTER',
            AlreadyRegister: 'ALREADY_REGISTER',
            NotAccessible: 'NOT_ACCESSIBLE',
            AlreadyRegisterOrganisation: 'ALREADY_REGISTER_ORGANISATION',
            RegisterOrganisation: 'REGISTER_ORGANISATION'
        };
    })(exports.GrowbeRegisterResponse || (exports.GrowbeRegisterResponse = {}));

    (function (ModuleDataRequest) {
        ModuleDataRequest.LastXUnitEnum = {
            Month: 'Month',
            Hours: 'Hours',
            Minutes: 'Minutes',
            Day: 'Day',
            Date: 'Date'
        };
    })(exports.ModuleDataRequest || (exports.ModuleDataRequest = {}));

    var ApiModule = /** @class */ (function () {
        function ApiModule(parentModule, http) {
            if (parentModule) {
                throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
            }
            if (!http) {
                throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                    'See also https://github.com/angular/angular/issues/20575');
            }
        }
        ApiModule.forRoot = function (configurationFactory) {
            return {
                ngModule: ApiModule,
                providers: [{ provide: Configuration, useFactory: configurationFactory }]
            };
        };
        return ApiModule;
    }());
    ApiModule.decorators = [
        { type: i0.NgModule, args: [{
                    imports: [],
                    declarations: [],
                    exports: [],
                    providers: []
                },] }
    ];
    ApiModule.ctorParameters = function () { return [
        { type: ApiModule, decorators: [{ type: i0.Optional }, { type: i0.SkipSelf }] },
        { type: i1.HttpClient, decorators: [{ type: i0.Optional }] }
    ]; };

    /*
     * Public API Surface of growbe-cloud-api
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.APIS = APIS;
    exports.ApiModule = ApiModule;
    exports.BASE_PATH = BASE_PATH;
    exports.COLLECTION_FORMATS = COLLECTION_FORMATS;
    exports.Configuration = Configuration;
    exports.GrowbeDashboardControllerService = GrowbeDashboardControllerService;
    exports.GrowbeMainboardControllerService = GrowbeMainboardControllerService;
    exports.GrowbeModuleControllerService = GrowbeModuleControllerService;
    exports.GrowbeModuleDefControllerService = GrowbeModuleDefControllerService;
    exports.GrowbeModuleGraphControllerService = GrowbeModuleGraphControllerService;
    exports.GrowbeSensorValueControllerService = GrowbeSensorValueControllerService;
    exports.GrowbeStreamControllerService = GrowbeStreamControllerService;
    exports.GrowbeWarningControllerService = GrowbeWarningControllerService;
    exports.PingControllerService = PingControllerService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=growbe2-ngx-cloud-api.umd.js.map