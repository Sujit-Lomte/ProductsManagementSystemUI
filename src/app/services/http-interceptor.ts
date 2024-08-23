import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private notification: NotificationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap((response: HttpEvent<any>) => {
            if (response instanceof HttpResponse) {
                
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                this.notification.error(err?.error?.Message || err?.message);
            }
        }));
    }
}
