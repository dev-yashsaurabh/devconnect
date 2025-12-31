import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Feed } from './features/feed/feed';
import { DevForm } from './features/ng-learning/dev-form/form';
import { DevHttp } from './features/ng-learning/dev-http/dev-http';
import { SwitchMapComponent } from './features/ng-learning/rxjs-operators/switch-map/dev-switch';
import { MergeMapComponent } from './features/ng-learning/rxjs-operators/merge-map/dev-merge';
import { ConcatMapComponent } from './features/ng-learning/rxjs-operators/concat-map/dev-concat';
import { DevSignal } from './features/ng-learning/dev-signal/dev-signal';
import { DevLinkedSignal } from './features/ng-learning/dev-signal/dev-linked-signal';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'feed',
    component: Feed,
    // canActivate: [authGuard], 
    data: { roles: ['developer', 'admin'] }
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['admin'] },
    loadComponent: () =>
      import('./features/admin/admin').then(m => m.Admin)

  },
  {
    path: 'project/:id',
    loadComponent: () => import('./features/project-details/project-details').then(m => m.ProjectDetails)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/user-profile/profile').then(m => m.ProfileComponent)
  },
  {
    path: 'signal', component: DevSignal
  },
  {
    path: 'linked-signal', component: DevLinkedSignal
  },
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
  {
    path: 'concatMap', component: ConcatMapComponent
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: '**', redirectTo: 'login' },
];
