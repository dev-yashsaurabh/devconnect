import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'developer';
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Signal to store current user
  private _user = signal<User | null>(null);

  // Computed signal to know if logged in
  isLoggedIn = computed(() => !!this._user());

  constructor(private http: HttpClient, private router: Router) {
    // Load user from localStorage if exists
    const stored = localStorage.getItem('devconnect_user');
    if (stored) {
      this._user.set(JSON.parse(stored));
    }
  }

  /** Observable / Signal getter */
  currentUser() {
    return this._user();
  }

  /** Login method */
  login(email: string, password: string) {
    // Call your backend API here
    return this.http.post<User>('/api/login', { email, password }).subscribe({
      next: (user) => {
        // Save user in signal
        this._user.set(user);
        // Save in localStorage
        localStorage.setItem('devconnect_user', JSON.stringify(user));
        // Redirect based on role
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/feed']);
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
      }
    });
  }

  /** Logout method */
  logout() {
    this._user.set(null);
    localStorage.removeItem('devconnect_user');
    this.router.navigate(['/login']);
  }

  /** Check role */
  hasRole(role: 'admin' | 'developer') {
    const user = this._user();
    return user ? user.role === role : false;
  }

  /** Get JWT token */
  getToken() {
    const user = this._user();
    return user?.token || null;
  }
}
