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
/* tslint:disable:no-unused-variable member-ordering */
import { Inject, Injectable, Optional } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { BASE_PATH } from '../variables';
import { Configuration } from '../configuration';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "../configuration";
export class UserPreferenceControllerService {
    constructor(httpClient, basePath, configuration) {
        this.httpClient = httpClient;
        this.basePath = 'http://localhost/api';
        this.defaultHeaders = new HttpHeaders();
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
    addToHttpParams(httpParams, value, key) {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        }
        else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }
    addToHttpParamsRecursive(httpParams, value, key) {
        if (value == null) {
            return httpParams;
        }
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                value.forEach(elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
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
                Object.keys(value).forEach(k => httpParams = this.addToHttpParamsRecursive(httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        }
        else if (key != null) {
            httpParams = httpParams.append(key, value);
        }
        else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }
    userPreferenceControllerGetUserPreference(observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.get(`${this.configuration.basePath}/preferences`, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
    userPreferenceControllerPatchUserPreference(requestBody, observe = 'body', reportProgress = false, options) {
        let headers = this.defaultHeaders;
        let httpHeaderAcceptSelected = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts = [];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes = [
            'application/json'
        ];
        const httpContentTypeSelected = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }
        let responseType = 'json';
        if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType = 'text';
        }
        return this.httpClient.patch(`${this.configuration.basePath}/preferences`, requestBody, {
            responseType: responseType,
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        });
    }
}
UserPreferenceControllerService.ɵfac = function UserPreferenceControllerService_Factory(t) { return new (t || UserPreferenceControllerService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(BASE_PATH, 8), i0.ɵɵinject(i2.Configuration, 8)); };
UserPreferenceControllerService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UserPreferenceControllerService, factory: UserPreferenceControllerService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UserPreferenceControllerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [BASE_PATH]
            }] }, { type: i2.Configuration, decorators: [{
                type: Optional
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclByZWZlcmVuY2VDb250cm9sbGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ncm93YmUtY2xvdWQtYXBpL3NyYy9saWIvY2xvdWQvYXBpL3VzZXJQcmVmZXJlbmNlQ29udHJvbGxlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFDSCx1REFBdUQ7QUFFdkQsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQTJCLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQWMsV0FBVyxFQUNzQixNQUFZLHNCQUFzQixDQUFDO0FBQ3pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUErQixZQUFZLENBQUM7QUFJL0UsT0FBTyxFQUFFLFNBQVMsRUFBc0IsTUFBMEIsY0FBYyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBMEMsa0JBQWtCLENBQUM7Ozs7QUFPckYsTUFBTSxPQUFPLCtCQUErQjtJQU94QyxZQUFzQixVQUFzQixFQUFnQyxRQUFnQixFQUFjLGFBQTRCO1FBQWhILGVBQVUsR0FBVixVQUFVLENBQVk7UUFMbEMsYUFBUSxHQUFHLHNCQUFzQixDQUFDO1FBQ3JDLG1CQUFjLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUNuQyxrQkFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFJdkMsSUFBSSxhQUFhLEVBQUU7WUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztTQUN0QztRQUNELElBQUksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDakQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQzlCLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQzVCO1lBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdB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Q3ZDLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1NBQ2xFO1FBRUQsSUFBSSxZQUFZLEdBQW9CLE1BQU0sQ0FBQztRQUMzQyxJQUFHLHdCQUF3QixJQUFJLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN4RSxZQUFZLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO1FBRUQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxjQUFjLEVBQzFFLFdBQVcsRUFDWDtZQUNJLFlBQVksRUFBTyxZQUFZO1lBQy9CLGVBQWUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWU7WUFDbkQsT0FBTyxFQUFFLE9BQU87WUFDaEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsY0FBYyxFQUFFLGNBQWM7U0FDakMsQ0FDSixDQUFDO0lBQ04sQ0FBQzs7OEdBaEpRLCtCQUErQiwwQ0FPeUIsU0FBUztxRkFQakUsK0JBQStCLFdBQS9CLCtCQUErQixtQkFGOUIsTUFBTTt1RkFFUCwrQkFBK0I7Y0FIM0MsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFRa0QsUUFBUTs7c0JBQUcsTUFBTTt1QkFBQyxTQUFTOztzQkFBcUIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ3Jvd2JlLWNsb3VkXG4gKiBDbG91ZCBzZXJ2ZXIgZm9yIEdyb3diZVxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAwLjAuMFxuICogQ29udGFjdDogd3F1aW50YWxAYmVybGluZ29xYy5jb21cbiAqXG4gKiBOT1RFOiBUaGlzIGNsYXNzIGlzIGF1dG8gZ2VuZXJhdGVkIGJ5IE9wZW5BUEkgR2VuZXJhdG9yIChodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2gpLlxuICogaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoXG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKi9cbi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBtZW1iZXItb3JkZXJpbmcgKi9cblxuaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9ICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMsXG4gICAgICAgICBIdHRwUmVzcG9uc2UsIEh0dHBFdmVudCwgSHR0cFBhcmFtZXRlckNvZGVjIH0gICAgICAgZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgQ3VzdG9tSHR0cFBhcmFtZXRlckNvZGVjIH0gICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL2VuY29kZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJ3J4anMnO1xuXG5cbmltcG9ydCB7IEJBU0VfUEFUSCwgQ09MTEVDVElPTl9GT1JNQVRTIH0gICAgICAgICAgICAgICAgICAgICBmcm9tICcuLi92YXJpYWJsZXMnO1xuaW1wb3J0IHsgQ29uZmlndXJhdGlvbiB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gJy4uL2NvbmZpZ3VyYXRpb24nO1xuXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgVXNlclByZWZlcmVuY2VDb250cm9sbGVyU2VydmljZSB7XG5cbiAgICBwcm90ZWN0ZWQgYmFzZVBhdGggPSAnaHR0cDovL2xvY2FsaG9zdC9hcGknO1xuICAgIHB1YmxpYyBkZWZhdWx0SGVhZGVycyA9IG5ldyBIdHRwSGVhZGVycygpO1xuICAgIHB1YmxpYyBjb25maWd1cmF0aW9uID0gbmV3IENvbmZpZ3VyYXRpb24oKTtcbiAgICBwdWJsaWMgZW5jb2RlcjogSHR0cFBhcmFtZXRlckNvZGVjO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIEBPcHRpb25hbCgpQEluamVjdChCQVNFX1BBVEgpIGJhc2VQYXRoOiBzdHJpbmcsIEBPcHRpb25hbCgpIGNvbmZpZ3VyYXRpb246IENvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgaWYgKGNvbmZpZ3VyYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbiA9IGNvbmZpZ3VyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJhc2VQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGJhc2VQYXRoID0gdGhpcy5iYXNlUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY29uZmlndXJhdGlvbi5iYXNlUGF0aCA9IGJhc2VQYXRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IHRoaXMuY29uZmlndXJhdGlvbi5lbmNvZGVyIHx8IG5ldyBDdXN0b21IdHRwUGFyYW1ldGVyQ29kZWMoKTtcbiAgICB9XG5cblxuICAgIHByaXZhdGUgYWRkVG9IdHRwUGFyYW1zKGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMsIHZhbHVlOiBhbnksIGtleT86IHN0cmluZyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmIHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSB0aGlzLmFkZFRvSHR0cFBhcmFtc1JlY3Vyc2l2ZShodHRwUGFyYW1zLCB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBodHRwUGFyYW1zID0gdGhpcy5hZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoaHR0cFBhcmFtcywgdmFsdWUsIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoaHR0cFBhcmFtczogSHR0cFBhcmFtcywgdmFsdWU/OiBhbnksIGtleT86IHN0cmluZyk6IEh0dHBQYXJhbXMge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAodmFsdWUgYXMgYW55W10pLmZvckVhY2goIGVsZW0gPT4gaHR0cFBhcmFtcyA9IHRoaXMuYWRkVG9IdHRwUGFyYW1zUmVjdXJzaXZlKGh0dHBQYXJhbXMsIGVsZW0sIGtleSkpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuYXBwZW5kKGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSBhcyBEYXRlKS50b0lTT1N0cmluZygpLnN1YnN0cigwLCAxMCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJrZXkgbWF5IG5vdCBiZSBudWxsIGlmIHZhbHVlIGlzIERhdGVcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZSkuZm9yRWFjaCggayA9PiBodHRwUGFyYW1zID0gdGhpcy5hZGRUb0h0dHBQYXJhbXNSZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgICAgIGh0dHBQYXJhbXMsIHZhbHVlW2tdLCBrZXkgIT0gbnVsbCA/IGAke2tleX0uJHtrfWAgOiBrKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLmFwcGVuZChrZXksIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwia2V5IG1heSBub3QgYmUgbnVsbCBpZiB2YWx1ZSBpcyBub3Qgb2JqZWN0IG9yIGFycmF5XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBodHRwUGFyYW1zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBvYnNlcnZlIHNldCB3aGV0aGVyIG9yIG5vdCB0byByZXR1cm4gdGhlIGRhdGEgT2JzZXJ2YWJsZSBhcyB0aGUgYm9keSwgcmVzcG9uc2Ugb3IgZXZlbnRzLiBkZWZhdWx0cyB0byByZXR1cm5pbmcgdGhlIGJvZHkuXG4gICAgICogQHBhcmFtIHJlcG9ydFByb2dyZXNzIGZsYWcgdG8gcmVwb3J0IHJlcXVlc3QgYW5kIHJlc3BvbnNlIHByb2dyZXNzLlxuICAgICAqL1xuICAgIHB1YmxpYyB1c2VyUHJlZmVyZW5jZUNvbnRyb2xsZXJHZXRVc2VyUHJlZmVyZW5jZShvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sIG9wdGlvbnM/OiB7aHR0cEhlYWRlckFjY2VwdD86IHVuZGVmaW5lZH0pOiBPYnNlcnZhYmxlPGFueT47XG4gICAgcHVibGljIHVzZXJQcmVmZXJlbmNlQ29udHJvbGxlckdldFVzZXJQcmVmZXJlbmNlKG9ic2VydmU/OiAncmVzcG9uc2UnLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sIG9wdGlvbnM/OiB7aHR0cEhlYWRlckFjY2VwdD86IHVuZGVmaW5lZH0pOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxhbnk+PjtcbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2VDb250cm9sbGVyR2V0VXNlclByZWZlcmVuY2Uob2JzZXJ2ZT86ICdldmVudHMnLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sIG9wdGlvbnM/OiB7aHR0cEhlYWRlckFjY2VwdD86IHVuZGVmaW5lZH0pOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PjtcbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2VDb250cm9sbGVyR2V0VXNlclByZWZlcmVuY2Uob2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZGVmYXVsdEhlYWRlcnM7XG5cbiAgICAgICAgbGV0IGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gb3B0aW9ucyAmJiBvcHRpb25zLmh0dHBIZWFkZXJBY2NlcHQ7XG4gICAgICAgIGlmIChodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBBY2NlcHQgaGVhZGVyXG4gICAgICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnNlbGVjdEhlYWRlckFjY2VwdChodHRwSGVhZGVyQWNjZXB0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCByZXNwb25zZVR5cGU6ICd0ZXh0JyB8ICdqc29uJyA9ICdqc29uJztcbiAgICAgICAgaWYoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkICYmIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZC5zdGFydHNXaXRoKCd0ZXh0JykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQuZ2V0PGFueT4oYCR7dGhpcy5jb25maWd1cmF0aW9uLmJhc2VQYXRofS9wcmVmZXJlbmNlc2AsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiA8YW55PnJlc3BvbnNlVHlwZSxcbiAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMuY29uZmlndXJhdGlvbi53aXRoQ3JlZGVudGlhbHMsXG4gICAgICAgICAgICAgICAgaGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgICAgICBvYnNlcnZlOiBvYnNlcnZlLFxuICAgICAgICAgICAgICAgIHJlcG9ydFByb2dyZXNzOiByZXBvcnRQcm9ncmVzc1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSByZXF1ZXN0Qm9keSBcbiAgICAgKiBAcGFyYW0gb2JzZXJ2ZSBzZXQgd2hldGhlciBvciBub3QgdG8gcmV0dXJuIHRoZSBkYXRhIE9ic2VydmFibGUgYXMgdGhlIGJvZHksIHJlc3BvbnNlIG9yIGV2ZW50cy4gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIHRoZSBib2R5LlxuICAgICAqIEBwYXJhbSByZXBvcnRQcm9ncmVzcyBmbGFnIHRvIHJlcG9ydCByZXF1ZXN0IGFuZCByZXNwb25zZSBwcm9ncmVzcy5cbiAgICAgKi9cbiAgICBwdWJsaWMgdXNlclByZWZlcmVuY2VDb250cm9sbGVyUGF0Y2hVc2VyUHJlZmVyZW5jZShyZXF1ZXN0Qm9keT86IHsgW2tleTogc3RyaW5nXTogb2JqZWN0OyB9LCBvYnNlcnZlPzogJ2JvZHknLCByZXBvcnRQcm9ncmVzcz86IGJvb2xlYW4sIG9wdGlvbnM/OiB7aHR0cEhlYWRlckFjY2VwdD86IHVuZGVmaW5lZH0pOiBPYnNlcnZhYmxlPGFueT47XG4gICAgcHVibGljIHVzZXJQcmVmZXJlbmNlQ29udHJvbGxlclBhdGNoVXNlclByZWZlcmVuY2UocmVxdWVzdEJvZHk/OiB7IFtrZXk6IHN0cmluZ106IG9iamVjdDsgfSwgb2JzZXJ2ZT86ICdyZXNwb25zZScsIHJlcG9ydFByb2dyZXNzPzogYm9vbGVhbiwgb3B0aW9ucz86IHtodHRwSGVhZGVyQWNjZXB0PzogdW5kZWZpbmVkfSk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+O1xuICAgIHB1YmxpYyB1c2VyUHJlZmVyZW5jZUNvbnRyb2xsZXJQYXRjaFVzZXJQcmVmZXJlbmNlKHJlcXVlc3RCb2R5PzogeyBba2V5OiBzdHJpbmddOiBvYmplY3Q7IH0sIG9ic2VydmU/OiAnZXZlbnRzJywgcmVwb3J0UHJvZ3Jlc3M/OiBib29sZWFuLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj47XG4gICAgcHVibGljIHVzZXJQcmVmZXJlbmNlQ29udHJvbGxlclBhdGNoVXNlclByZWZlcmVuY2UocmVxdWVzdEJvZHk/OiB7IFtrZXk6IHN0cmluZ106IG9iamVjdDsgfSwgb2JzZXJ2ZTogYW55ID0gJ2JvZHknLCByZXBvcnRQcm9ncmVzczogYm9vbGVhbiA9IGZhbHNlLCBvcHRpb25zPzoge2h0dHBIZWFkZXJBY2NlcHQ/OiB1bmRlZmluZWR9KTogT2JzZXJ2YWJsZTxhbnk+IHtcblxuICAgICAgICBsZXQgaGVhZGVycyA9IHRoaXMuZGVmYXVsdEhlYWRlcnM7XG5cbiAgICAgICAgbGV0IGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZDogc3RyaW5nIHwgdW5kZWZpbmVkID0gb3B0aW9ucyAmJiBvcHRpb25zLmh0dHBIZWFkZXJBY2NlcHQ7XG4gICAgICAgIGlmIChodHRwSGVhZGVyQWNjZXB0U2VsZWN0ZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gdG8gZGV0ZXJtaW5lIHRoZSBBY2NlcHQgaGVhZGVyXG4gICAgICAgICAgICBjb25zdCBodHRwSGVhZGVyQWNjZXB0czogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkID0gdGhpcy5jb25maWd1cmF0aW9uLnNlbGVjdEhlYWRlckFjY2VwdChodHRwSGVhZGVyQWNjZXB0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0FjY2VwdCcsIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIHRvIGRldGVybWluZSB0aGUgQ29udGVudC1UeXBlIGhlYWRlclxuICAgICAgICBjb25zdCBjb25zdW1lczogc3RyaW5nW10gPSBbXG4gICAgICAgICAgICAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgXTtcbiAgICAgICAgY29uc3QgaHR0cENvbnRlbnRUeXBlU2VsZWN0ZWQ6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMuY29uZmlndXJhdGlvbi5zZWxlY3RIZWFkZXJDb250ZW50VHlwZShjb25zdW1lcyk7XG4gICAgICAgIGlmIChodHRwQ29udGVudFR5cGVTZWxlY3RlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBoZWFkZXJzID0gaGVhZGVycy5zZXQoJ0NvbnRlbnQtVHlwZScsIGh0dHBDb250ZW50VHlwZVNlbGVjdGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByZXNwb25zZVR5cGU6ICd0ZXh0JyB8ICdqc29uJyA9ICdqc29uJztcbiAgICAgICAgaWYoaHR0cEhlYWRlckFjY2VwdFNlbGVjdGVkICYmIGh0dHBIZWFkZXJBY2NlcHRTZWxlY3RlZC5zdGFydHNXaXRoKCd0ZXh0JykpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBDbGllbnQucGF0Y2g8YW55PihgJHt0aGlzLmNvbmZpZ3VyYXRpb24uYmFzZVBhdGh9L3ByZWZlcmVuY2VzYCxcbiAgICAgICAgICAgIHJlcXVlc3RCb2R5LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogPGFueT5yZXNwb25zZVR5cGUsXG4gICAgICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiB0aGlzLmNvbmZpZ3VyYXRpb24ud2l0aENyZWRlbnRpYWxzLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICAgICAgb2JzZXJ2ZTogb2JzZXJ2ZSxcbiAgICAgICAgICAgICAgICByZXBvcnRQcm9ncmVzczogcmVwb3J0UHJvZ3Jlc3NcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbn1cbiJdfQ==