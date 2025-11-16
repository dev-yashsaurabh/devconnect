import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class Login {
    loginForm;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required)
        })
    }

    onSubmit() {
        if(this.loginForm.valid){
            const {email, password} = this.loginForm.value
            console.log("email: ", email, password)
        }
    }
}