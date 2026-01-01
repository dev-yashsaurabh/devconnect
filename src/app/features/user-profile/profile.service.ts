import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserProfile } from './user-profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileService {

  getMyProfile(): Observable<UserProfile> {
    // Replace with real API later
    return of({
      name: 'Yash Kumar',
      email: 'yash@email.com',
      bio: 'Frontend Developer | Angular',
      profilePic: 'https://i.pravatar.cc/150',
      skills: ['Angular', 'TypeScript', 'RxJS'],
      socialLinks: {
        github: 'https://github.com/yash',
        linkedin: 'https://linkedin.com/in/yash',
        twitter: ''
      }
    });
  }

  updateMyProfile(payload: UserProfile): Observable<UserProfile> {
    console.log('Updating profile:', payload);
    return of(payload);
  }
}
