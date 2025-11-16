import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const user = this.auth.currentUser(); // get current user from signal
    const requiredRoles = route.data['roles'] as Array<string> | undefined;

    // 1️⃣ Not logged in → redirect to login
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2️⃣ Role-based access check
    if (requiredRoles && !requiredRoles.includes(user.role)) {
      this.router.navigate(['/login']); // or a /forbidden page if you prefer
      return false;
    }

    // 3️⃣ Allowed
    return true;
  }
}
