import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { UserProfile } from './user-profile.model';
import { ProfileService } from './profile.service';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-profile-edit',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [ReactiveFormsModule, MatButtonModule, CommonModule, MatCardModule, MatInputModule, MatChipsModule, MatIconModule]
})
export class ProfileEditComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA];
  profileForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    bio: [''],
    profilePic: [''],
    skills: this.fb.array<string>([]),
    socialLinks: this.fb.group({
      github: [''],
      linkedin: [''],
      twitter: ['']
    })
  });
  }

  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe((profile: UserProfile) => {
      this.profileForm.patchValue(profile);
      profile.skills.forEach(s => this.skills.push(this.fb.control(s)));
    });
  }

  addSkillFromInput(event: MatChipInputEvent) {
    const value = event.value?.trim();
    if (value && !this.skills.value.includes(value)) {
      this.skills.push(this.fb.control(value));
    }
    event.chipInput?.clear();
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.profileService
      .updateMyProfile(this.profileForm.value as UserProfile)
      .subscribe(() => this.router.navigate(['/profile']));
  }
}
