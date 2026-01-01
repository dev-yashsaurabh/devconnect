import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';
import { UserProfile } from './user-profile.model';
import { MatCardModule } from "@angular/material/card";
import { MatChipsModule } from "@angular/material/chips";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-profile-view',
  templateUrl: './profile-view.html',
  styleUrls: ['./profile-view.scss'],
  imports: [MatCardModule, MatChipsModule, CommonModule, MatButtonModule]
})
export class ProfileViewComponent implements OnInit {
  profile!: UserProfile;

  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe(p => this.profile = p);
  }

  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
