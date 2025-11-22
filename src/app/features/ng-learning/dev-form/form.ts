import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'dev-form',
    styleUrls: ['./dev-form.scss'],
    templateUrl: 'dev-form.html',
    imports: [MatCardModule, MatInputModule, ReactiveFormsModule, MatButtonModule]
})
export class DevForm {
    contactForm: FormGroup;

    constructor() {
        this.contactForm = new FormGroup({
            email: new FormControl('')
        });
    }

    get email() {
        return this.contactForm.get('email') as FormControl;
    }

    onSubmit() {
        if(this.contactForm.valid) {
            console.log(this.contactForm.value);
        }
    }
}
