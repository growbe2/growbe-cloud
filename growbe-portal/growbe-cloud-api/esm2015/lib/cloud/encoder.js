/**
 * Custom HttpParameterCodec
 * Workaround for https://github.com/angular/angular/issues/18261
 */
export class CustomHttpParameterCodec {
    encodeKey(k) {
        return encodeURIComponent(k);
    }
    encodeValue(v) {
        return encodeURIComponent(v);
    }
    decodeKey(k) {
        return decodeURIComponent(k);
    }
    decodeValue(v) {
        return decodeURIComponent(v);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2Rlci5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS93cS9Qcm9qZWN0L2dyb3diZS9ncm93YmUtY2xvdWQvZ3Jvd2JlLWNsb3VkLWFwaS9hbmd1bGFyL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjLyIsInNvdXJjZXMiOlsibGliL2Nsb3VkL2VuY29kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7OztHQUdHO0FBQ0gsTUFBTSxPQUFPLHdCQUF3QjtJQUNqQyxTQUFTLENBQUMsQ0FBUztRQUNmLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELFdBQVcsQ0FBQyxDQUFTO1FBQ2pCLE9BQU8sa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELFNBQVMsQ0FBQyxDQUFTO1FBQ2YsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBQ0QsV0FBVyxDQUFDLENBQVM7UUFDakIsT0FBTyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUGFyYW1ldGVyQ29kZWMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8qKlxuICogQ3VzdG9tIEh0dHBQYXJhbWV0ZXJDb2RlY1xuICogV29ya2Fyb3VuZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTgyNjFcbiAqL1xuZXhwb3J0IGNsYXNzIEN1c3RvbUh0dHBQYXJhbWV0ZXJDb2RlYyBpbXBsZW1lbnRzIEh0dHBQYXJhbWV0ZXJDb2RlYyB7XG4gICAgZW5jb2RlS2V5KGs6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoayk7XG4gICAgfVxuICAgIGVuY29kZVZhbHVlKHY6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodik7XG4gICAgfVxuICAgIGRlY29kZUtleShrOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGspO1xuICAgIH1cbiAgICBkZWNvZGVWYWx1ZSh2OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHYpO1xuICAgIH1cbn1cbiJdfQ==