import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoadingService} from '../services/system/loading.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class HttpRequestLoadingInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('this.loadingService.setLoading(true, request.url);');
    this.loadingService.setLoading(true, request.url);
    return next.handle(request)
        .pipe(catchError((err) => {
          this.loadingService.setLoading(false, request.url);
          return throwError(err);
        }))
        .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.loadingService.setLoading(false, request.url);
          }
          return evt;
        }));
  }
}
