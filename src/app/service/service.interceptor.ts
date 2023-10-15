import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError, finalize } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable()
export class ServiceInterceptor implements HttpInterceptor {

  constructor(private appStateService: AppStateService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.appStateService.setLoadStatus(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.appStateService.setLoadStatus(false);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof Error) {
          // A client-side or network error occurred.
          console.error('An error occurred:', error.error.message);
        } else {
          // The server-side error.
          console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
        }

        // If you want to return a new response:
        //return of(new HttpResponse({body: [{name: "Default value..."}]}));

        // If you want to return the error on the upper level:
        //return throwError(error);

        // If you want to return nothing:
        return EMPTY;
      })
    );
  }
}
