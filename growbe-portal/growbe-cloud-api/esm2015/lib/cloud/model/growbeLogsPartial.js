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
export var GrowbeLogsPartial;
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
})(GrowbeLogsPartial || (GrowbeLogsPartial = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jvd2JlTG9nc1BhcnRpYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9ncm93YmUtY2xvdWQtYXBpL3NyYy9saWIvY2xvdWQvbW9kZWwvZ3Jvd2JlTG9nc1BhcnRpYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7R0FVRztBQXFCSCxNQUFNLEtBQVcsaUJBQWlCLENBdUJqQztBQXZCRCxXQUFpQixpQkFBaUI7SUFFakIsOEJBQVksR0FBRztRQUN4QixFQUFFLEVBQUUsR0FBbUI7UUFDdkIsRUFBRSxFQUFFLEdBQW1CO1FBQ3ZCLEVBQUUsRUFBRSxHQUFtQjtLQUMxQixDQUFDO0lBRVcsMkJBQVMsR0FBRztRQUNyQixTQUFTLEVBQUUsV0FBd0I7UUFDbkMsT0FBTyxFQUFFLFNBQXNCO0tBQ2xDLENBQUM7SUFFVywwQkFBUSxHQUFHO1FBQ3BCLE1BQU0sRUFBRSxRQUFvQjtRQUM1QixZQUFZLEVBQUUsZUFBMkI7UUFDekMsVUFBVSxFQUFFLFlBQXdCO1FBQ3BDLFVBQVUsRUFBRSxhQUF5QjtRQUNyQyxTQUFTLEVBQUUsWUFBd0I7UUFDbkMsV0FBVyxFQUFFLGNBQTBCO1FBQ3ZDLFlBQVksRUFBRSxlQUEyQjtRQUN6QyxLQUFLLEVBQUUsT0FBbUI7S0FDN0IsQ0FBQztBQUNOLENBQUMsRUF2QmdCLGlCQUFpQixLQUFqQixpQkFBaUIsUUF1QmpDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBncm93YmUtY2xvdWRcbiAqIENsb3VkIHNlcnZlciBmb3IgR3Jvd2JlXG4gKlxuICogVGhlIHZlcnNpb24gb2YgdGhlIE9wZW5BUEkgZG9jdW1lbnQ6IDAuMC4wXG4gKiBDb250YWN0OiB3cXVpbnRhbEBiZXJsaW5nb3FjLmNvbVxuICpcbiAqIE5PVEU6IFRoaXMgY2xhc3MgaXMgYXV0byBnZW5lcmF0ZWQgYnkgT3BlbkFQSSBHZW5lcmF0b3IgKGh0dHBzOi8vb3BlbmFwaS1nZW5lcmF0b3IudGVjaCkuXG4gKiBodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2hcbiAqIERvIG5vdCBlZGl0IHRoZSBjbGFzcyBtYW51YWxseS5cbiAqL1xuXG5cbi8qKlxuICogKHRzVHlwZTogT21pdDxQYXJ0aWFsPEdyb3diZUxvZ3M+LCA+LCBzY2hlbWFPcHRpb25zOiB7IHRpdGxlOiBcXCdcXCcsIHBhcnRpYWw6IHRydWUsIGV4Y2x1ZGU6IFtdIH0pXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3Jvd2JlTG9nc1BhcnRpYWwgeyBcbiAgW2tleTogc3RyaW5nXTogb2JqZWN0IHwgYW55O1xuXG5cbiAgICBpZD86IHN0cmluZztcbiAgICB0aW1lc3RhbXA/OiBzdHJpbmc7XG4gICAgc2V2ZXJpdHk/OiBHcm93YmVMb2dzUGFydGlhbC5TZXZlcml0eUVudW07XG4gICAgZ3JvdXA/OiBHcm93YmVMb2dzUGFydGlhbC5Hcm91cEVudW07XG4gICAgdHlwZT86IEdyb3diZUxvZ3NQYXJ0aWFsLlR5cGVFbnVtO1xuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgbmV3U3RhdGU/OiBvYmplY3Q7XG4gICAgb2xkU3RhdGU/OiBvYmplY3Q7XG4gICAgZ3Jvd2JlTWFpbmJvYXJkSWQ/OiBzdHJpbmc7XG4gICAgZ3Jvd2JlTW9kdWxlSWQ/OiBzdHJpbmc7XG59XG5leHBvcnQgbmFtZXNwYWNlIEdyb3diZUxvZ3NQYXJ0aWFsIHtcbiAgICBleHBvcnQgdHlwZSBTZXZlcml0eUVudW0gPSAnMCcgfCAnMScgfCAnMic7XG4gICAgZXhwb3J0IGNvbnN0IFNldmVyaXR5RW51bSA9IHtcbiAgICAgICAgXzA6ICcwJyBhcyBTZXZlcml0eUVudW0sXG4gICAgICAgIF8xOiAnMScgYXMgU2V2ZXJpdHlFbnVtLFxuICAgICAgICBfMjogJzInIGFzIFNldmVyaXR5RW51bVxuICAgIH07XG4gICAgZXhwb3J0IHR5cGUgR3JvdXBFbnVtID0gJ21haW5ib2FyZCcgfCAnbW9kdWxlcyc7XG4gICAgZXhwb3J0IGNvbnN0IEdyb3VwRW51bSA9IHtcbiAgICAgICAgTWFpbmJvYXJkOiAnbWFpbmJvYXJkJyBhcyBHcm91cEVudW0sXG4gICAgICAgIE1vZHVsZXM6ICdtb2R1bGVzJyBhcyBHcm91cEVudW1cbiAgICB9O1xuICAgIGV4cG9ydCB0eXBlIFR5cGVFbnVtID0gJ21vZHVsZScgfCAnbW9kdWxlX2NvbmZpZycgfCAnY29ubmVjdGlvbicgfCAnbmV3X3dhcm5pbmcnIHwgJ3VwZGF0ZV9ydGMnIHwgJ3N5bmNfcmVxdWVzdCcgfCAnZ3Jvd2JlX2NvbmZpZycgfCAnYWxhcm0nO1xuICAgIGV4cG9ydCBjb25zdCBUeXBlRW51bSA9IHtcbiAgICAgICAgTW9kdWxlOiAnbW9kdWxlJyBhcyBUeXBlRW51bSxcbiAgICAgICAgTW9kdWxlQ29uZmlnOiAnbW9kdWxlX2NvbmZpZycgYXMgVHlwZUVudW0sXG4gICAgICAgIENvbm5lY3Rpb246ICdjb25uZWN0aW9uJyBhcyBUeXBlRW51bSxcbiAgICAgICAgTmV3V2FybmluZzogJ25ld193YXJuaW5nJyBhcyBUeXBlRW51bSxcbiAgICAgICAgVXBkYXRlUnRjOiAndXBkYXRlX3J0YycgYXMgVHlwZUVudW0sXG4gICAgICAgIFN5bmNSZXF1ZXN0OiAnc3luY19yZXF1ZXN0JyBhcyBUeXBlRW51bSxcbiAgICAgICAgR3Jvd2JlQ29uZmlnOiAnZ3Jvd2JlX2NvbmZpZycgYXMgVHlwZUVudW0sXG4gICAgICAgIEFsYXJtOiAnYWxhcm0nIGFzIFR5cGVFbnVtXG4gICAgfTtcbn1cblxuXG4iXX0=