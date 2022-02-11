export class Configuration {
    constructor(configurationParameters = {}) {
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
            this.credentials['bearerAuth'] = () => {
                return typeof this.accessToken === 'function'
                    ? this.accessToken()
                    : this.accessToken;
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
    selectHeaderContentType(contentTypes) {
        if (contentTypes.length === 0) {
            return undefined;
        }
        const type = contentTypes.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return contentTypes[0];
        }
        return type;
    }
    /**
     * Select the correct accept content-type to use for a request.
     * Uses {@link Configuration#isJsonMime} to determine the correct accept content-type.
     * If no content type is found return the first found type if the contentTypes is not empty
     * @param accepts - the array of content types that are available for selection.
     * @returns the selected content-type or <code>undefined</code> if no selection could be made.
     */
    selectHeaderAccept(accepts) {
        if (accepts.length === 0) {
            return undefined;
        }
        const type = accepts.find((x) => this.isJsonMime(x));
        if (type === undefined) {
            return accepts[0];
        }
        return type;
    }
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
    isJsonMime(mime) {
        const jsonMime = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
    lookupCredential(key) {
        const value = this.credentials[key];
        return typeof value === 'function'
            ? value()
            : value;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlndXJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2dyb3diZS1jbG91ZC1hcGkvc3JjL2xpYi9jbG91ZC9jb25maWd1cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxNQUFNLE9BQU8sYUFBYTtJQXFCdEIsWUFBWSwwQkFBbUQsRUFBRTtRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUF1QixDQUFDLFFBQVEsQ0FBQztRQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDLGVBQWUsQ0FBQztRQUMvRCxJQUFJLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQztRQUMvQyxJQUFJLHVCQUF1QixDQUFDLFdBQVcsRUFBRTtZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQztTQUMxRDthQUNJO1lBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7U0FDekI7UUFFRCxxQ0FBcUM7UUFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLEVBQUU7Z0JBQ2xDLE9BQU8sT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVU7b0JBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUMzQixDQUFDLENBQUM7U0FDTDtJQUNMLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSx1QkFBdUIsQ0FBRSxZQUFzQjtRQUNsRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQzNCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSSxrQkFBa0IsQ0FBQyxPQUFpQjtRQUN2QyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3RCLE9BQU8sU0FBUyxDQUFDO1NBQ3BCO1FBRUQsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdELElBQUksSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUNwQixPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNyQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSSxVQUFVLENBQUMsSUFBWTtRQUMxQixNQUFNLFFBQVEsR0FBVyxJQUFJLE1BQU0sQ0FBQywrREFBK0QsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxRyxPQUFPLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTSxnQkFBZ0IsQ0FBQyxHQUFXO1FBQy9CLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVO1lBQzlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDVCxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2hCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBQYXJhbWV0ZXJDb2RlYyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWd1cmF0aW9uUGFyYW1ldGVycyB7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhcGlLZXlzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nfTtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gICAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xuICAgIC8qKlxuICAgICAqIFRoZSBrZXlzIGFyZSB0aGUgbmFtZXMgaW4gdGhlIHNlY3VyaXR5U2NoZW1lcyBzZWN0aW9uIG9mIHRoZSBPcGVuQVBJXG4gICAgICogZG9jdW1lbnQuIFRoZXkgc2hvdWxkIG1hcCB0byB0aGUgdmFsdWUgdXNlZCBmb3IgYXV0aGVudGljYXRpb25cbiAgICAgKiBtaW51cyBhbnkgc3RhbmRhcmQgcHJlZml4ZXMgc3VjaCBhcyAnQmFzaWMnIG9yICdCZWFyZXInLlxuICAgICAqL1xuICAgIGNyZWRlbnRpYWxzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nIHwgKCgpID0+IHN0cmluZyB8IHVuZGVmaW5lZCl9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvbiB7XG4gICAgLyoqXG4gICAgICogIEBkZXByZWNhdGVkIFNpbmNlIDUuMC4gVXNlIGNyZWRlbnRpYWxzIGluc3RlYWRcbiAgICAgKi9cbiAgICBhcGlLZXlzPzoge1sga2V5OiBzdHJpbmcgXTogc3RyaW5nfTtcbiAgICB1c2VybmFtZT86IHN0cmluZztcbiAgICBwYXNzd29yZD86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiAgQGRlcHJlY2F0ZWQgU2luY2UgNS4wLiBVc2UgY3JlZGVudGlhbHMgaW5zdGVhZFxuICAgICAqL1xuICAgIGFjY2Vzc1Rva2VuPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gICAgYmFzZVBhdGg/OiBzdHJpbmc7XG4gICAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbiAgICBlbmNvZGVyPzogSHR0cFBhcmFtZXRlckNvZGVjO1xuICAgIC8qKlxuICAgICAqIFRoZSBrZXlzIGFyZSB0aGUgbmFtZXMgaW4gdGhlIHNlY3VyaXR5U2NoZW1lcyBzZWN0aW9uIG9mIHRoZSBPcGVuQVBJXG4gICAgICogZG9jdW1lbnQuIFRoZXkgc2hvdWxkIG1hcCB0byB0aGUgdmFsdWUgdXNlZCBmb3IgYXV0aGVudGljYXRpb25cbiAgICAgKiBtaW51cyBhbnkgc3RhbmRhcmQgcHJlZml4ZXMgc3VjaCBhcyAnQmFzaWMnIG9yICdCZWFyZXInLlxuICAgICAqL1xuICAgIGNyZWRlbnRpYWxzOiB7WyBrZXk6IHN0cmluZyBdOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkKX07XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWd1cmF0aW9uUGFyYW1ldGVyczogQ29uZmlndXJhdGlvblBhcmFtZXRlcnMgPSB7fSkge1xuICAgICAgICB0aGlzLmFwaUtleXMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5hcGlLZXlzO1xuICAgICAgICB0aGlzLnVzZXJuYW1lID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMudXNlcm5hbWU7XG4gICAgICAgIHRoaXMucGFzc3dvcmQgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5wYXNzd29yZDtcbiAgICAgICAgdGhpcy5hY2Nlc3NUb2tlbiA9IGNvbmZpZ3VyYXRpb25QYXJhbWV0ZXJzLmFjY2Vzc1Rva2VuO1xuICAgICAgICB0aGlzLmJhc2VQYXRoID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMuYmFzZVBhdGg7XG4gICAgICAgIHRoaXMud2l0aENyZWRlbnRpYWxzID0gY29uZmlndXJhdGlvblBhcmFtZXRlcnMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5lbmNvZGVyO1xuICAgICAgICBpZiAoY29uZmlndXJhdGlvblBhcmFtZXRlcnMuY3JlZGVudGlhbHMpIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjb25maWd1cmF0aW9uUGFyYW1ldGVycy5jcmVkZW50aWFscztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXQgZGVmYXVsdCBiZWFyZXJBdXRoIGNyZWRlbnRpYWxcbiAgICAgICAgaWYgKCF0aGlzLmNyZWRlbnRpYWxzWydiZWFyZXJBdXRoJ10pIHtcbiAgICAgICAgICAgIHRoaXMuY3JlZGVudGlhbHNbJ2JlYXJlckF1dGgnXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuYWNjZXNzVG9rZW4gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmFjY2Vzc1Rva2VuKClcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmFjY2Vzc1Rva2VuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbGVjdCB0aGUgY29ycmVjdCBjb250ZW50LXR5cGUgdG8gdXNlIGZvciBhIHJlcXVlc3QuXG4gICAgICogVXNlcyB7QGxpbmsgQ29uZmlndXJhdGlvbiNpc0pzb25NaW1lfSB0byBkZXRlcm1pbmUgdGhlIGNvcnJlY3QgY29udGVudC10eXBlLlxuICAgICAqIElmIG5vIGNvbnRlbnQgdHlwZSBpcyBmb3VuZCByZXR1cm4gdGhlIGZpcnN0IGZvdW5kIHR5cGUgaWYgdGhlIGNvbnRlbnRUeXBlcyBpcyBub3QgZW1wdHlcbiAgICAgKiBAcGFyYW0gY29udGVudFR5cGVzIC0gdGhlIGFycmF5IG9mIGNvbnRlbnQgdHlwZXMgdGhhdCBhcmUgYXZhaWxhYmxlIGZvciBzZWxlY3Rpb25cbiAgICAgKiBAcmV0dXJucyB0aGUgc2VsZWN0ZWQgY29udGVudC10eXBlIG9yIDxjb2RlPnVuZGVmaW5lZDwvY29kZT4gaWYgbm8gc2VsZWN0aW9uIGNvdWxkIGJlIG1hZGUuXG4gICAgICovXG4gICAgcHVibGljIHNlbGVjdEhlYWRlckNvbnRlbnRUeXBlIChjb250ZW50VHlwZXM6IHN0cmluZ1tdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGNvbnRlbnRUeXBlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB0eXBlID0gY29udGVudFR5cGVzLmZpbmQoKHg6IHN0cmluZykgPT4gdGhpcy5pc0pzb25NaW1lKHgpKTtcbiAgICAgICAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnRUeXBlc1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZWxlY3QgdGhlIGNvcnJlY3QgYWNjZXB0IGNvbnRlbnQtdHlwZSB0byB1c2UgZm9yIGEgcmVxdWVzdC5cbiAgICAgKiBVc2VzIHtAbGluayBDb25maWd1cmF0aW9uI2lzSnNvbk1pbWV9IHRvIGRldGVybWluZSB0aGUgY29ycmVjdCBhY2NlcHQgY29udGVudC10eXBlLlxuICAgICAqIElmIG5vIGNvbnRlbnQgdHlwZSBpcyBmb3VuZCByZXR1cm4gdGhlIGZpcnN0IGZvdW5kIHR5cGUgaWYgdGhlIGNvbnRlbnRUeXBlcyBpcyBub3QgZW1wdHlcbiAgICAgKiBAcGFyYW0gYWNjZXB0cyAtIHRoZSBhcnJheSBvZiBjb250ZW50IHR5cGVzIHRoYXQgYXJlIGF2YWlsYWJsZSBmb3Igc2VsZWN0aW9uLlxuICAgICAqIEByZXR1cm5zIHRoZSBzZWxlY3RlZCBjb250ZW50LXR5cGUgb3IgPGNvZGU+dW5kZWZpbmVkPC9jb2RlPiBpZiBubyBzZWxlY3Rpb24gY291bGQgYmUgbWFkZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0SGVhZGVyQWNjZXB0KGFjY2VwdHM6IHN0cmluZ1tdKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgaWYgKGFjY2VwdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdHlwZSA9IGFjY2VwdHMuZmluZCgoeDogc3RyaW5nKSA9PiB0aGlzLmlzSnNvbk1pbWUoeCkpO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gYWNjZXB0c1swXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB0aGUgZ2l2ZW4gTUlNRSBpcyBhIEpTT04gTUlNRS5cbiAgICAgKiBKU09OIE1JTUUgZXhhbXBsZXM6XG4gICAgICogICBhcHBsaWNhdGlvbi9qc29uXG4gICAgICogICBhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURjhcbiAgICAgKiAgIEFQUExJQ0FUSU9OL0pTT05cbiAgICAgKiAgIGFwcGxpY2F0aW9uL3ZuZC5jb21wYW55K2pzb25cbiAgICAgKiBAcGFyYW0gbWltZSAtIE1JTUUgKE11bHRpcHVycG9zZSBJbnRlcm5ldCBNYWlsIEV4dGVuc2lvbnMpXG4gICAgICogQHJldHVybiBUcnVlIGlmIHRoZSBnaXZlbiBNSU1FIGlzIEpTT04sIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBwdWJsaWMgaXNKc29uTWltZShtaW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgY29uc3QganNvbk1pbWU6IFJlZ0V4cCA9IG5ldyBSZWdFeHAoJ14oYXBwbGljYXRpb25cXC9qc29ufFteOy8gXFx0XStcXC9bXjsvIFxcdF0rWytdanNvbilbIFxcdF0qKDsuKik/JCcsICdpJyk7XG4gICAgICAgIHJldHVybiBtaW1lICE9PSBudWxsICYmIChqc29uTWltZS50ZXN0KG1pbWUpIHx8IG1pbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2FwcGxpY2F0aW9uL2pzb24tcGF0Y2granNvbicpO1xuICAgIH1cblxuICAgIHB1YmxpYyBsb29rdXBDcmVkZW50aWFsKGtleTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmNyZWRlbnRpYWxzW2tleV07XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgID8gdmFsdWUoKVxuICAgICAgICAgICAgOiB2YWx1ZTtcbiAgICB9XG59XG4iXX0=