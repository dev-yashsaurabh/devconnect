import { Component } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, ReactiveFormsModule, ValidationErrors, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'dev-form',
    styleUrls: ['./dev-form.scss'],
    templateUrl: 'dev-form.html',
    imports: [
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
    ],
})
export class DevForm {
    contactForm: FormGroup;
    matcher = new MyErrorStateMatcher();

    constructor() {
        this.contactForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            name: new FormControl('', [Validators.required, nameValidator])
        });
    }

    get email() {
        return this.contactForm.get('email') as FormControl;
    }

    get name() {
        return this.contactForm.get('name') as FormControl;
    }

    onSubmit() {
        if(this.contactForm.valid) {
            console.log(this.contactForm.value);
        }
    }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (!value) return null;

  const regex = /^[a-zA-Z ]+$/;
  return regex.test(value) ? null : { invalidName: true };
}
