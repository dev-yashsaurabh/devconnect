import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../auth/auth.service";
import { catchError, from, Observable, switchMap, throwError } from "rxjs";
import { MsalService } from "@azure/msal-angular";
import { environment } from "../../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private msal: MsalService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.auth.currentUser();
    console.log(1)
    if (!req.url.startsWith('http')) {
      req = req.clone({
        url: `${environment.apiUrl}${req.url}`
      });
    }

    if (this.isPublic(req.url)) {
      return next.handle(req);
    }

    if (user?.provider === 'jwt') {
      const token = this.auth.getToken();
      if (token) {
        req = this.attachToken(req, token);
      }
      return this.handle401(next.handle(req));
    }

    if (user?.provider === 'msal') {
      return this.handleMsal(req, next);
    }

    return this.handle401(next.handle(req));
  }

  private handleMsal(req: HttpRequest<any>, next: HttpHandler) {
    const account = this.msal.instance.getActiveAccount();
    if (!account) return next.handle(req);

    return from(
      this.msal.acquireTokenSilent({
        scopes: ['user.read'],
        account
      })
    ).pipe(
      switchMap(result =>
        this.handle401(next.handle(this.attachToken(req, result.accessToken)))
      )
    );
  }

  private attachToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handle401(stream$: Observable<HttpEvent<any>>) {
    return stream$.pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
        }
        return throwError(() => error);
      })
    );
  }

  private isPublic(url: string) {
    return ['/api/auth/login', '/api/auth/register'].some(u => url.includes(u));
  }
}
