import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Feed } from './features/feed/feed';
import { Admin } from './features/admin/admin';
import { DevForm } from './features/ng-learning/dev-form/form';
import { DevHttp } from './features/ng-learning/dev-http/dev-http';

export const routes: Routes = [
    {
      path: 'form', component: DevForm
    },
    {
      path: 'http', component: DevHttp
    },
    {path: 'login', component: Login},
    { 
    path: 'feed', 
    component: Feed, 
    // canActivate: [AuthGuard], 
    data: { roles: ['developer', 'admin'] } 
  },
  { 
    path: 'admin', 
    component: Admin, 
    // canActivate: [AuthGuard], 
    data: { roles: ['developer', 'admin'] } 
  },
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    {path: '**', redirectTo: 'login'},
];
