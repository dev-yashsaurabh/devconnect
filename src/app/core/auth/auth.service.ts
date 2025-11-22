import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';

export interface User {
  email: string,
  role: 'admin' | 'developer',
  provider: 'jwt' | 'msal',
  name: string,
  token: string,
  id: number
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
      const parsed = JSON.parse(stored);
      this._user.set(parsed);
      this._provider.set(parsed.provider);
    }
  }

  currentUser() {
    return this._user();
  }

  login(email: string, password: string) {
    return this.http.post<User>('/api/login', { email, password }).subscribe({
      next: (user) => {
        this._provider.set('jwt');

        this._user.set({ ...user, provider: 'jwt' });
        localStorage.setItem('devconnect_user', JSON.stringify({ ...user, provider: 'jwt' }));

        this.redirectByRole(user.role);
      },
      error: err => console.error('Login failed:', err)
    });
  }

  loginWithMicrosoft() {
    this.msal.loginPopup().subscribe({
      next: (result: AuthenticationResult) => {
        this.msal.instance.setActiveAccount(result.account);

        const user = {
          id: 0,
          name: result.account?.name ?? '',
          email: result.account?.username ?? '',
          role: 'admin',
          token: '',
          provider: 'msal'
        } as User;

        this._user.set(user);
        this._provider.set('msal');

        localStorage.setItem('devconnect_user', JSON.stringify(user));

        this.redirectByRole(user.role);
      },
      error: error => console.log('MSAL Login Failed', error)
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

  hasRole(role: 'admin' | 'developer') {
    return this._user()?.role === role;
  }

  getToken() {
    return this._provider() === 'jwt' ? this._user()?.token : null;
  }

  private redirectByRole(role: string) {
    if (role === 'admin') this.router.navigate(['/admin']);
    else this.router.navigate(['/feed']);
  }
}
