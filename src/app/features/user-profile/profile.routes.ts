import { Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view';
import { ProfileEditComponent } from './profile';

export const PROFILE_ROUTES: Routes = [
  { path: '', component: ProfileViewComponent },
  { path: 'edit', component: ProfileEditComponent }
];
