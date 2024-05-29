import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler) {
        // Set the default headers
        let headers = new HttpHeaders({
            'Authorization': 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFibWx4ZFdWZmJtRnRaU0k2SWtkc2IySnBRWEJ3SWl3aWNtOXNaU0k2SWtGa2JXbHVJaXdpYm1KbUlqb3hOVGczTXpjME1qSXlMQ0psZUhBaU9qRTNORFV4TkRBMk1qSXNJbWxoZENJNk1UVTROek0zTkRJeU1pd2lhWE56SWpvaVJVSlRUaUlzSW1GMVpDSTZJa1ZDVTA0aWZRLm93T3lrZFpGd3BWRlBRZ3hLWWRaejhDWGlfczJpY2c2d3dsbUZJV19kUGc='
        });

        // Check if the request body is not form data
        if (!(request.body instanceof FormData)) {
            // Add content type header for JSON data
            headers = headers.append('Content-Type', 'application/json');
        }

        // Clone the request and set the modified headers
        const modifiedRequest = request.clone({ headers });

        // Pass the modified request to the next handler
        return next.handle(modifiedRequest);
    }
}
