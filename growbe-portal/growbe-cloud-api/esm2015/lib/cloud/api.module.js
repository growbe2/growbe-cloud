import { NgModule, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';
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
ApiModule.decorators = [
    { type: NgModule, args: [{
                imports: [],
                declarations: [],
                exports: [],
                providers: []
            },] }
];
ApiModule.ctorParameters = () => [
    { type: ApiModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: HttpClient, decorators: [{ type: Optional }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS93cS9Qcm9qZWN0L2dyb3diZS9ncm93YmUtY2xvdWQvZ3Jvd2JlLWNsb3VkLWFwaS9hbmd1bGFyL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjLyIsInNvdXJjZXMiOlsibGliL2Nsb3VkL2FwaS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBaUJsRCxNQUFNLE9BQU8sU0FBUztJQVFsQixZQUFxQyxZQUF1QixFQUNuQyxJQUFnQjtRQUNyQyxJQUFJLFlBQVksRUFBRTtZQUNkLE1BQU0sSUFBSSxLQUFLLENBQUMsa0VBQWtFLENBQUMsQ0FBQztTQUN2RjtRQUNELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDUCxNQUFNLElBQUksS0FBSyxDQUFDLCtEQUErRDtnQkFDL0UsMERBQTBELENBQUMsQ0FBQztTQUMvRDtJQUNMLENBQUM7SUFoQk0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBeUM7UUFDM0QsT0FBTztZQUNILFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxDQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsb0JBQW9CLEVBQUUsQ0FBRTtTQUM5RSxDQUFDO0lBQ04sQ0FBQzs7O1lBWkosUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBTyxFQUFFO2dCQUNoQixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsT0FBTyxFQUFPLEVBQUU7Z0JBQ2hCLFNBQVMsRUFBRSxFQUFFO2FBQ2Q7OztZQVNzRCxTQUFTLHVCQUE5QyxRQUFRLFlBQUksUUFBUTtZQXpCN0IsVUFBVSx1QkEwQkQsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBTa2lwU2VsZiwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ3VyYXRpb24gfSBmcm9tICcuL2NvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuaW1wb3J0IHsgR3Jvd2JlRGFzaGJvYXJkQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVEYXNoYm9hcmRDb250cm9sbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3Jvd2JlTWFpbmJvYXJkQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVNYWluYm9hcmRDb250cm9sbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3Jvd2JlTW9kdWxlQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVNb2R1bGVDb250cm9sbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3Jvd2JlTW9kdWxlRGVmQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVNb2R1bGVEZWZDb250cm9sbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3Jvd2JlTW9kdWxlRGVmR3Jvd2JlTWFpbmJvYXJkQ29udHJvbGxlclNlcnZpY2UgfSBmcm9tICcuL2FwaS9ncm93YmVNb2R1bGVEZWZHcm93YmVNYWluYm9hcmRDb250cm9sbGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgR3Jvd2JlTW9kdWxlR3JhcGhDb250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL2dyb3diZU1vZHVsZUdyYXBoQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdyb3diZVN0cmVhbUNvbnRyb2xsZXJTZXJ2aWNlIH0gZnJvbSAnLi9hcGkvZ3Jvd2JlU3RyZWFtQ29udHJvbGxlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBpbmdDb250cm9sbGVyU2VydmljZSB9IGZyb20gJy4vYXBpL3BpbmdDb250cm9sbGVyLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiAgICAgIFtdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiAgICAgIFtdLFxuICBwcm92aWRlcnM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEFwaU1vZHVsZSB7XG4gICAgcHVibGljIHN0YXRpYyBmb3JSb290KGNvbmZpZ3VyYXRpb25GYWN0b3J5OiAoKSA9PiBDb25maWd1cmF0aW9uKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBcGlNb2R1bGU+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBcGlNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFsgeyBwcm92aWRlOiBDb25maWd1cmF0aW9uLCB1c2VGYWN0b3J5OiBjb25maWd1cmF0aW9uRmFjdG9yeSB9IF1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvciggQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBBcGlNb2R1bGUsXG4gICAgICAgICAgICAgICAgIEBPcHRpb25hbCgpIGh0dHA6IEh0dHBDbGllbnQpIHtcbiAgICAgICAgaWYgKHBhcmVudE1vZHVsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcGlNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEltcG9ydCBpbiB5b3VyIGJhc2UgQXBwTW9kdWxlIG9ubHkuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFodHRwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1lvdSBuZWVkIHRvIGltcG9ydCB0aGUgSHR0cENsaWVudE1vZHVsZSBpbiB5b3VyIEFwcE1vZHVsZSEgXFxuJyArXG4gICAgICAgICAgICAnU2VlIGFsc28gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMjA1NzUnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==