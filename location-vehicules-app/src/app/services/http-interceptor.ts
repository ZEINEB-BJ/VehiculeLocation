import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from './loader.service';
import { NotificationService } from './notification.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private loader: LoaderService, private notification: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loader.show();
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const message = err.error?.message || err.message || 'Erreur réseau';
        this.notification.error(message);
        return throwError(() => err);
      }),
      finalize(() => this.loader.hide())
    );
  }
}
