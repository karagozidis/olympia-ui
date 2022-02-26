import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const jwtToken = localStorage.getItem('token');

    if (jwtToken === '' || jwtToken === undefined || jwtToken == null) {
      return next.handle(request)
    }

    let updatedRequest
    if (request.headers.has('Content-Type') && request.headers.get('Content-Type') === 'multipart/form-data' ) {
      updatedRequest = request.clone({
        headers: new HttpHeaders({
          'Authorization': 'Bearer ' + jwtToken
        })
      });
    } else {
      updatedRequest = request.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + jwtToken
        })
      });
    }
    return next.handle(updatedRequest);

  }
}
