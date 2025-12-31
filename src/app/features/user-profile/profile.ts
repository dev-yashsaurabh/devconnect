import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatIcon } from "@angular/material/icon";
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatInputModule, MatChipsModule
, MatIcon]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  // chip separator keys
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadProfile(); // mock / API call
  }

  private initForm(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      profilePic: [''],
      skills: this.fb.array([]),
      socialLinks: this.fb.group({
        github: [''],
        linkedin: [''],
        twitter: ['']
      })
    });
  }

  // ===== getters =====
  get skills(): FormArray {
    return this.profileForm.get('skills') as FormArray;
  }

  // ===== skills handlers =====
  addSkill(skill: string): void {
    if (!skill) return;

    // prevent duplicates
    const exists = this.skills.value.includes(skill);
    if (!exists) {
      this.skills.push(this.fb.control(skill));
    }
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }

  addSkillFromInput(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.addSkill(value);
    }
    event.chipInput?.clear();
  }

  // ===== mock API =====
  loadProfile(): void {
    // Replace with real API call
    const mockProfile = {
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
    };

    this.profileForm.patchValue(mockProfile);
    mockProfile.skills.forEach(skill => this.addSkill(skill));
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    console.log('Profile payload:', this.profileForm.value);
    // call update profile API here
  }
}
