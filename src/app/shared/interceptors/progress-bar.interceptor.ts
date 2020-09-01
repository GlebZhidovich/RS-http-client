import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ProgressBarService } from '../services';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {
    constructor(private progressBar: ProgressBarService) {}
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        this.progressBar.show();
        return next.handle(request).pipe(
            // tap(() => {
            //     console.log('ProgressBarInterceptor');
            // }),
            finalize(() => {
                this.progressBar.hide();
            }),
        );
    }
}
