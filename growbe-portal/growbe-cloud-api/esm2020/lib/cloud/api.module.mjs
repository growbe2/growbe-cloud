import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class ApiModule {
    constructor(parentModule, http) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
                'See also https://github.com/angular/angular/issues/20575');
        }
    }
    static forRoot(configurationFactory) {
        return {
            ngModule: ApiModule,
            providers: [{ provide: Configuration, useFactory: configurationFactory }]
        };
    }
}
ApiModule.ɵfac = function ApiModule_Factory(t) { return new (t || ApiModule)(i0.ɵɵinject(ApiModule, 12), i0.ɵɵinject(i1.HttpClient, 8)); };
ApiModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ApiModule });
ApiModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [], imports: [[]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ApiModule, [{
        type: NgModule,
        args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: []
            }]
    }], function () { return [{ type: ApiModule, decorators: [{
                type: Optional
            }, {
                type: SkipSelf
            }] }, { type: i1.HttpClient, decorators: [{
                type: Optional
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjL2xpYi9jbG91ZC9hcGkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFzQmhELE1BQU0sT0FBTyxTQUFTO0lBUWxCLFlBQXFDLFlBQXVCLEVBQ25DLElBQWdCO1FBQ3JDLElBQUksWUFBWSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStEO2dCQUMvRSwwREFBMEQsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQWhCTSxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUF5QztRQUMzRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFLENBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxDQUFFO1NBQzlFLENBQUM7SUFDTixDQUFDOztrRUFOUSxTQUFTLGNBUWlDLFNBQVM7MkRBUm5ELFNBQVM7Z0VBRlQsRUFBRSxZQUhDLEVBQUU7dUZBS0wsU0FBUztjQU5yQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFPLEVBQUU7Z0JBQ2hCLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQU8sRUFBRTtnQkFDaEIsU0FBUyxFQUFFLEVBQUU7YUFDZDtzQ0FTc0QsU0FBUztzQkFBOUMsUUFBUTs7c0JBQUksUUFBUTs7c0JBQ3BCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IEdyb3diZURhc2hib2FyZENvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlRGFzaGJvYXJkQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1haW5ib2FyZEFjdGlvbkNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTWFpbmJvYXJkQWN0aW9uQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1haW5ib2FyZENvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTWFpbmJvYXJkQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1haW5ib2FyZFZlcnNpb25Db250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL2dyb3diZU1haW5ib2FyZFZlcnNpb25Db250cm9sbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3Jvd2JlTW9kdWxlQ2FsaWJyYXRpb25Db250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL2dyb3diZU1vZHVsZUNhbGlicmF0aW9uQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZUNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTW9kdWxlQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZURlZkNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTW9kdWxlRGVmQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZUdyYXBoQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVNb2R1bGVHcmFwaENvbnRyb2xsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBHcm93YmVTdHJlYW1Db250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL2dyb3diZVN0cmVhbUNvbnRyb2xsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQaW5nQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9waW5nQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJQcmVmZXJlbmNlQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS91c2VyUHJlZmVyZW5jZUNvbnRyb2xsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBWaXJ0dWFsUmVsYXlDb250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL3ZpcnR1YWxSZWxheUNvbnRyb2xsZXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6ICAgICAgW10sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6ICAgICAgW10sXG4gIHByb3ZpZGVyczogW11cbn0pXG5leHBvcnQgY2xhc3MgQXBpTW9kdWxlIHtcbiAgICBwdWJsaWMgc3RhdGljIGZvclJvb3QoY29uZmlndXJhdGlvbkZhY3Rvcnk6ICgpID0+IENvbmZpZ3VyYXRpb24pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFwaU1vZHVsZT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEFwaU1vZHVsZSxcbiAgICAgICAgICAgIHByb3ZpZGVyczogWyB7IHByb3ZpZGU6IENvbmZpZ3VyYXRpb24sIHVzZUZhY3Rvcnk6IGNvbmZpZ3VyYXRpb25GYWN0b3J5IH0gXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IEFwaU1vZHVsZSxcbiAgICAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FwaU1vZHVsZSBpcyBhbHJlYWR5IGxvYWRlZC4gSW1wb3J0IGluIHlvdXIgYmFzZSBBcHBNb2R1bGUgb25seS4nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWh0dHApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IG5lZWQgdG8gaW1wb3J0IHRoZSBIdHRwQ2xpZW50TW9kdWxlIGluIHlvdXIgQXBwTW9kdWxlISBcXG4nICtcbiAgICAgICAgICAgICdTZWUgYWxzbyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8yMDU3NScpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19