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
export var GroupingDataRequest;
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
})(GroupingDataRequest || (GroupingDataRequest = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBpbmdEYXRhUmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjL2xpYi9jbG91ZC9tb2RlbC9ncm91cGluZ0RhdGFSZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7O0dBVUc7QUFRSCxNQUFNLEtBQVcsbUJBQW1CLENBZW5DO0FBZkQsV0FBaUIsbUJBQW1CO0lBRW5CLGlDQUFhLEdBQUc7UUFDekIsTUFBTSxFQUFFLFFBQXlCO1FBQ2pDLElBQUksRUFBRSxNQUF1QjtRQUM3QixTQUFTLEVBQUUsV0FBNEI7UUFDdkMsSUFBSSxFQUFFLE1BQXVCO0tBQ2hDLENBQUM7SUFFVyxvQ0FBZ0IsR0FBRztRQUM1QixNQUFNLEVBQUUsUUFBNEI7UUFDcEMsSUFBSSxFQUFFLE1BQTBCO1FBQ2hDLFNBQVMsRUFBRSxXQUErQjtRQUMxQyxJQUFJLEVBQUUsTUFBMEI7S0FDbkMsQ0FBQztBQUNOLENBQUMsRUFmZ0IsbUJBQW1CLEtBQW5CLG1CQUFtQixRQWVuQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ3Jvd2JlLWNsb3VkXG4gKiBDbG91ZCBzZXJ2ZXIgZm9yIEdyb3diZVxuICpcbiAqIFRoZSB2ZXJzaW9uIG9mIHRoZSBPcGVuQVBJIGRvY3VtZW50OiAwLjAuMFxuICogQ29udGFjdDogd3F1aW50YWxAYmVybGluZ29xYy5jb21cbiAqXG4gKiBOT1RFOiBUaGlzIGNsYXNzIGlzIGF1dG8gZ2VuZXJhdGVkIGJ5IE9wZW5BUEkgR2VuZXJhdG9yIChodHRwczovL29wZW5hcGktZ2VuZXJhdG9yLnRlY2gpLlxuICogaHR0cHM6Ly9vcGVuYXBpLWdlbmVyYXRvci50ZWNoXG4gKiBEbyBub3QgZWRpdCB0aGUgY2xhc3MgbWFudWFsbHkuXG4gKi9cblxuXG5leHBvcnQgaW50ZXJmYWNlIEdyb3VwaW5nRGF0YVJlcXVlc3QgeyBcbiAgICBiYXNlR3JvdXA/OiBBcnJheTxHcm91cGluZ0RhdGFSZXF1ZXN0LkJhc2VHcm91cEVudW0+O1xuICAgIGludGVydmFsVW5pdD86IEdyb3VwaW5nRGF0YVJlcXVlc3QuSW50ZXJ2YWxVbml0RW51bTtcbiAgICBpbnRlcnZhbFZhbHVlPzogbnVtYmVyO1xufVxuZXhwb3J0IG5hbWVzcGFjZSBHcm91cGluZ0RhdGFSZXF1ZXN0IHtcbiAgICBleHBvcnQgdHlwZSBCYXNlR3JvdXBFbnVtID0gJ21pbnV0ZScgfCAnaG91cicgfCAnZGF5T2ZZZWFyJyB8ICd5ZWFyJztcbiAgICBleHBvcnQgY29uc3QgQmFzZUdyb3VwRW51bSA9IHtcbiAgICAgICAgTWludXRlOiAnbWludXRlJyBhcyBCYXNlR3JvdXBFbnVtLFxuICAgICAgICBIb3VyOiAnaG91cicgYXMgQmFzZUdyb3VwRW51bSxcbiAgICAgICAgRGF5T2ZZZWFyOiAnZGF5T2ZZZWFyJyBhcyBCYXNlR3JvdXBFbnVtLFxuICAgICAgICBZZWFyOiAneWVhcicgYXMgQmFzZUdyb3VwRW51bVxuICAgIH07XG4gICAgZXhwb3J0IHR5cGUgSW50ZXJ2YWxVbml0RW51bSA9ICdtaW51dGUnIHwgJ2hvdXInIHwgJ2RheU9mWWVhcicgfCAneWVhcic7XG4gICAgZXhwb3J0IGNvbnN0IEludGVydmFsVW5pdEVudW0gPSB7XG4gICAgICAgIE1pbnV0ZTogJ21pbnV0ZScgYXMgSW50ZXJ2YWxVbml0RW51bSxcbiAgICAgICAgSG91cjogJ2hvdXInIGFzIEludGVydmFsVW5pdEVudW0sXG4gICAgICAgIERheU9mWWVhcjogJ2RheU9mWWVhcicgYXMgSW50ZXJ2YWxVbml0RW51bSxcbiAgICAgICAgWWVhcjogJ3llYXInIGFzIEludGVydmFsVW5pdEVudW1cbiAgICB9O1xufVxuXG5cbiJdfQ==