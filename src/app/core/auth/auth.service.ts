import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'developer';
  provider: 'jwt' | 'msal';
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<User | null>(null);
  private _provider = signal<'jwt' | 'msal' | null>(null);

  isLoggedIn = computed(() => !!this._user());

  constructor(
    private http: HttpClient,
    private router: Router,
    private msal: MsalService
  ) {
    const stored = localStorage.getItem('devconnect_user');
    if (stored) {
      const user = JSON.parse(stored) as User;
      this._user.set(user);
      this._provider.set(user.provider);
    }
  }

  // ===== READ =====
  currentUser() {
    return this._user();
  }

  hasRole(role: 'admin' | 'developer') {
    return this._user()?.role === role;
  }

  getToken() {
    return this._provider() === 'jwt' ? this._user()?.token ?? null : null;
  }

  // ===== WRITE =====
  login(email: string, password: string) {
    return this.http.post<User>('/auth/login', { email, password });
  }

  setJwtUser(user: User) {
    const updated: User = { ...user, provider: 'jwt' };
    this._user.set(updated);
    this._provider.set('jwt');
    localStorage.setItem('devconnect_user', JSON.stringify(updated));
    this.redirectByRole(updated.role);
  }

  loginWithMicrosoft() {
    this.msal.loginPopup().subscribe({
      next: (result: AuthenticationResult) => {
        this.msal.instance.setActiveAccount(result.account);

        const user: User = {
          id: 0,
          name: result.account?.name ?? '',
          email: result.account?.username ?? '',
          role: 'admin',
          token: '',
          provider: 'msal',
        };

        this._user.set(user);
        this._provider.set('msal');
        localStorage.setItem('devconnect_user', JSON.stringify(user));

        this.redirectByRole(user.role);
      },
      error: err => console.error('MSAL login failed', err),
    });
  }

  logout() {
    if (this._provider() === 'msal') {
      this.msal.logoutPopup();
    }

    this._user.set(null);
    this._provider.set(null);
    localStorage.removeItem('devconnect_user');
    this.router.navigate(['/login']);
  }

  private redirectByRole(role: 'admin' | 'developer') {
    role === 'admin'
      ? this.router.navigate(['/admin'])
      : this.router.navigate(['/feed']);
  }
}
