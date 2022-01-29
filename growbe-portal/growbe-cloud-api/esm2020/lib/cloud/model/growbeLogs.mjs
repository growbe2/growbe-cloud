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
export var GrowbeLogs;
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
        LocalConnection: 'local_connection',
        NewWarning: 'new_warning',
        UpdateRtc: 'update_rtc',
        SyncRequest: 'sync_request',
        GrowbeConfig: 'growbe_config',
        Alarm: 'alarm',
        Restart: 'restart',
        Updated: 'updated'
    };
})(GrowbeLogs || (GrowbeLogs = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3Jvd2JlTG9ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjL2xpYi9jbG91ZC9tb2RlbC9ncm93YmVMb2dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFrQkgsTUFBTSxLQUFXLFVBQVUsQ0EwQjFCO0FBMUJELFdBQWlCLFVBQVU7SUFFVix1QkFBWSxHQUFHO1FBQ3hCLEVBQUUsRUFBRSxHQUFtQjtRQUN2QixFQUFFLEVBQUUsR0FBbUI7UUFDdkIsRUFBRSxFQUFFLEdBQW1CO0tBQzFCLENBQUM7SUFFVyxvQkFBUyxHQUFHO1FBQ3JCLFNBQVMsRUFBRSxXQUF3QjtRQUNuQyxPQUFPLEVBQUUsU0FBc0I7S0FDbEMsQ0FBQztJQUVXLG1CQUFRLEdBQUc7UUFDcEIsTUFBTSxFQUFFLFFBQW9CO1FBQzVCLFlBQVksRUFBRSxlQUEyQjtRQUN6QyxVQUFVLEVBQUUsWUFBd0I7UUFDcEMsZUFBZSxFQUFFLGtCQUE4QjtRQUMvQyxVQUFVLEVBQUUsYUFBeUI7UUFDckMsU0FBUyxFQUFFLFlBQXdCO1FBQ25DLFdBQVcsRUFBRSxjQUEwQjtRQUN2QyxZQUFZLEVBQUUsZUFBMkI7UUFDekMsS0FBSyxFQUFFLE9BQW1CO1FBQzFCLE9BQU8sRUFBRSxTQUFxQjtRQUM5QixPQUFPLEVBQUUsU0FBcUI7S0FDakMsQ0FBQztBQUNOLENBQUMsRUExQmdCLFVBQVUsS0FBVixVQUFVLFFBMEIxQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ3Jvd2JlLWNsb3VkXG4gKiBDbG91ZCBzZXJ2ZXIgZm9yIEdyb3diZVxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAwLjAuMFxuICogQ29udGFjdDogd3F1aW50YWxAYmVybGluZ29xYy5jb21cbiAqXG4gKiBOT1RFOiBUaGlzIGNsYXNzIGlzIGF1dG8gZ2VuZXJhdGVkIGJ5IE9wZW5BUEkgR2VuZXJhdG9yIChodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2gpLlxuICogaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoXG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKi9cblxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3diZUxvZ3MgeyBcbiAgW2tleTogc3RyaW5nXTogb2JqZWN0IHwgYW55O1xuXG5cbiAgICBpZD86IHN0cmluZztcbiAgICB0aW1lc3RhbXA/OiBzdHJpbmc7XG4gICAgc2V2ZXJpdHk/OiBHcm93YmVMb2dzLlNldmVyaXR5RW51bTtcbiAgICBncm91cD86IEdyb3diZUxvZ3MuR3JvdXBFbnVtO1xuICAgIHR5cGU/OiBHcm93YmVMb2dzLlR5cGVFbnVtO1xuICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgbmV3U3RhdGU/OiBvYmplY3Q7XG4gICAgb2xkU3RhdGU/OiBvYmplY3Q7XG4gICAgZ3Jvd2JlTWFpbmJvYXJkSWQ/OiBzdHJpbmc7XG4gICAgZ3Jvd2JlTW9kdWxlSWQ/OiBzdHJpbmc7XG59XG5leHBvcnQgbmFtZXNwYWNlIEdyb3diZUxvZ3Mge1xuICAgIGV4cG9ydCB0eXBlIFNldmVyaXR5RW51bSA9ICcwJyB8ICcxJyB8ICcyJztcbiAgICBleHBvcnQgY29uc3QgU2V2ZXJpdHlFbnVtID0ge1xuICAgICAgICBfMDogJzAnIGFzIFNldmVyaXR5RW51bSxcbiAgICAgICAgXzE6ICcxJyBhcyBTZXZlcml0eUVudW0sXG4gICAgICAgIF8yOiAnMicgYXMgU2V2ZXJpdHlFbnVtXG4gICAgfTtcbiAgICBleHBvcnQgdHlwZSBHcm91cEVudW0gPSAnbWFpbmJvYXJkJyB8ICdtb2R1bGVzJztcbiAgICBleHBvcnQgY29uc3QgR3JvdXBFbnVtID0ge1xuICAgICAgICBNYWluYm9hcmQ6ICdtYWluYm9hcmQnIGFzIEdyb3VwRW51bSxcbiAgICAgICAgTW9kdWxlczogJ21vZHVsZXMnIGFzIEdyb3VwRW51bVxuICAgIH07XG4gICAgZXhwb3J0IHR5cGUgVHlwZUVudW0gPSAnbW9kdWxlJyB8ICdtb2R1bGVfY29uZmlnJyB8ICdjb25uZWN0aW9uJyB8ICdsb2NhbF9jb25uZWN0aW9uJyB8ICduZXdfd2FybmluZycgfCAndXBkYXRlX3J0YycgfCAnc3luY19yZXF1ZXN0JyB8ICdncm93YmVfY29uZmlnJyB8ICdhbGFybScgfCAncmVzdGFydCcgfCAndXBkYXRlZCc7XG4gICAgZXhwb3J0IGNvbnN0IFR5cGVFbnVtID0ge1xuICAgICAgICBNb2R1bGU6ICdtb2R1bGUnIGFzIFR5cGVFbnVtLFxuICAgICAgICBNb2R1bGVDb25maWc6ICdtb2R1bGVfY29uZmlnJyBhcyBUeXBlRW51bSxcbiAgICAgICAgQ29ubmVjdGlvbjogJ2Nvbm5lY3Rpb24nIGFzIFR5cGVFbnVtLFxuICAgICAgICBMb2NhbENvbm5lY3Rpb246ICdsb2NhbF9jb25uZWN0aW9uJyBhcyBUeXBlRW51bSxcbiAgICAgICAgTmV3V2FybmluZzogJ25ld193YXJuaW5nJyBhcyBUeXBlRW51bSxcbiAgICAgICAgVXBkYXRlUnRjOiAndXBkYXRlX3J0YycgYXMgVHlwZUVudW0sXG4gICAgICAgIFN5bmNSZXF1ZXN0OiAnc3luY19yZXF1ZXN0JyBhcyBUeXBlRW51bSxcbiAgICAgICAgR3Jvd2JlQ29uZmlnOiAnZ3Jvd2JlX2NvbmZpZycgYXMgVHlwZUVudW0sXG4gICAgICAgIEFsYXJtOiAnYWxhcm0nIGFzIFR5cGVFbnVtLFxuICAgICAgICBSZXN0YXJ0OiAncmVzdGFydCcgYXMgVHlwZUVudW0sXG4gICAgICAgIFVwZGF0ZWQ6ICd1cGRhdGVkJyBhcyBUeXBlRW51bVxuICAgIH07XG59XG5cblxuIl19