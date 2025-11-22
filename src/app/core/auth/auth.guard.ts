import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const environment = {
  mslConfig: {
    clientId: "<clientId>",
    authority: "https://login.microsoftonline.com/<Tenant_Id>",
    redirectUri: 'http://localhost:4200/' // change redirect url based on where u want to redirect after the authentication
  }
};

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.currentUser();
    const requiredRoles = route.data['roles'] as Array<string> | undefined;

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
