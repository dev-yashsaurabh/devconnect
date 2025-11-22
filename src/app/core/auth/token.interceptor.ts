import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { catchError, from, Observable, switchMap, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MsalService } from "@azure/msal-angular";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private msal: MsalService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const provider = this.auth.currentUser()?.provider;

    // Skip public endpoints
    const isPublic = ['/api/login', '/api/register'].some(
      url => req.url.includes(url)
    );
    if (isPublic) return next.handle(req);
    if (provider === 'jwt') {
      const token = this.auth.getToken();
      if (token) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return this.handle401(authReq, next);
      }
    }
    
    if (provider === 'msal') {
      const account = this.msal.instance.getActiveAccount();

      if (account) {
        return from(
          this.msal.acquireTokenSilent({
            scopes: ['user.read'],
            account
          })
        ).pipe(
          switchMap(result => {
            const authReq = req.clone({
              setHeaders: { Authorization: `Bearer ${result.accessToken}` }
            });
            return this.handle401(authReq, next);
          })
        );
      }
    }

    return this.handle401(req, next);
  }

  private handle401(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
