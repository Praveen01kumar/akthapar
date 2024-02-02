import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private apiservice: ApiService) { this.apiservice.token.subscribe((res: string) => { this.token = res; }); }
    token: string = '';
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const excludedRoutes: string[] = ['auth/login', 'auth/signup', 'auth/logout'];
        if (excludedRoutes.some(route => request.url.includes(route))) { return next.handle(request); }
        const authRequest = request.clone({ setHeaders: { Authorization: `Bearer ${this.token}` }, });
        return next.handle(authRequest);
    }
}
