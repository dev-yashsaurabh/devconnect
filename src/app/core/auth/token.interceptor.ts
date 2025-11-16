import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    // Skip token for public endpoints like login/register
    const publicEndpoints = ['/api/login', '/api/register'];
    const isPublic = publicEndpoints.some(url => req.url.includes(url));

    if (!isPublic) {
      const token = this.auth.getToken();
      if (token) {
        authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
      }
    }

    // Handle response and catch 401 errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized, logout user
          this.auth.logout();
          // Optionally show a toast / message
          console.error('Unauthorized, redirecting to login');
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
