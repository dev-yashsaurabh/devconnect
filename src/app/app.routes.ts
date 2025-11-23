import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Feed } from './features/feed/feed';
import { Admin } from './features/admin/admin';
import { DevForm } from './features/ng-learning/dev-form/form';
import { DevHttp } from './features/ng-learning/dev-http/dev-http';
import { SwitchMapComponent } from './features/ng-learning/rxjs-operators/switch-map/dev-switch';
import { MergeMapComponent } from './features/ng-learning/rxjs-operators/merge-map/dev-merge';

export const routes: Routes = [
    {
      path: 'form', component: DevForm
    },
    {
      path: 'http', component: DevHttp
    },
    {
      path: 'switchMap', component: SwitchMapComponent
    },
    {
      path: 'mergeMap', component: MergeMapComponent
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
