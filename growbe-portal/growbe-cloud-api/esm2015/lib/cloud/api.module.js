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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjL2xpYi9jbG91ZC9hcGkubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFrQmhELE1BQU0sT0FBTyxTQUFTO0lBUWxCLFlBQXFDLFlBQXVCLEVBQ25DLElBQWdCO1FBQ3JDLElBQUksWUFBWSxFQUFFO1lBQ2QsTUFBTSxJQUFJLEtBQUssQ0FBQyxrRUFBa0UsQ0FBQyxDQUFDO1NBQ3ZGO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNQLE1BQU0sSUFBSSxLQUFLLENBQUMsK0RBQStEO2dCQUMvRSwwREFBMEQsQ0FBQyxDQUFDO1NBQy9EO0lBQ0wsQ0FBQztJQWhCTSxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUF5QztRQUMzRCxPQUFPO1lBQ0gsUUFBUSxFQUFFLFNBQVM7WUFDbkIsU0FBUyxFQUFFLENBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFVBQVUsRUFBRSxvQkFBb0IsRUFBRSxDQUFFO1NBQzlFLENBQUM7SUFDTixDQUFDOztrRUFOUSxTQUFTLGNBUWlDLFNBQVM7MkRBUm5ELFNBQVM7Z0VBRlQsRUFBRSxZQUhDLEVBQUU7dUZBS0wsU0FBUztjQU5yQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFPLEVBQUU7Z0JBQ2hCLFlBQVksRUFBRSxFQUFFO2dCQUNoQixPQUFPLEVBQU8sRUFBRTtnQkFDaEIsU0FBUyxFQUFFLEVBQUU7YUFDZDtzQ0FTc0QsU0FBUztzQkFBOUMsUUFBUTs7c0JBQUksUUFBUTs7c0JBQ3BCLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycywgU2tpcFNlbGYsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uIH0gZnJvbSAnLi9jb25maWd1cmF0aW9uJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbmltcG9ydCB7IEdyb3diZURhc2hib2FyZENvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlRGFzaGJvYXJkQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1haW5ib2FyZENvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTWFpbmJvYXJkQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZUNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTW9kdWxlQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZURlZkNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTW9kdWxlRGVmQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZURlZkdyb3diZU1haW5ib2FyZENvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlTW9kdWxlRGVmR3Jvd2JlTWFpbmJvYXJkQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZU1vZHVsZUdyYXBoQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVNb2R1bGVHcmFwaENvbnRyb2xsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBHcm93YmVTdHJlYW1Db250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL2dyb3diZVN0cmVhbUNvbnRyb2xsZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQaW5nQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9waW5nQ29udHJvbGxlci5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogICAgICBbXSxcbiAgZGVjbGFyYXRpb25zOiBbXSxcbiAgZXhwb3J0czogICAgICBbXSxcbiAgcHJvdmlkZXJzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBBcGlNb2R1bGUge1xuICAgIHB1YmxpYyBzdGF0aWMgZm9yUm9vdChjb25maWd1cmF0aW9uRmFjdG9yeTogKCkgPT4gQ29uZmlndXJhdGlvbik6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXBpTW9kdWxlPiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogQXBpTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbIHsgcHJvdmlkZTogQ29uZmlndXJhdGlvbiwgdXNlRmFjdG9yeTogY29uZmlndXJhdGlvbkZhY3RvcnkgfSBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoIEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIHBhcmVudE1vZHVsZTogQXBpTW9kdWxlLFxuICAgICAgICAgICAgICAgICBAT3B0aW9uYWwoKSBodHRwOiBIdHRwQ2xpZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXBpTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJbXBvcnQgaW4geW91ciBiYXNlIEFwcE1vZHVsZSBvbmx5LicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaHR0cCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgbmVlZCB0byBpbXBvcnQgdGhlIEh0dHBDbGllbnRNb2R1bGUgaW4geW91ciBBcHBNb2R1bGUhIFxcbicgK1xuICAgICAgICAgICAgJ1NlZSBhbHNvIGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvaXNzdWVzLzIwNTc1Jyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=