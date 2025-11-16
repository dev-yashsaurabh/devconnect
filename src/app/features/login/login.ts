import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { AuthService } from "../../core/auth/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    imports: [CommonModule, MatCardModule, ReactiveFormsModule, MatInputModule, MatButtonModule]
})
export class Login {
    loginForm;
    auth = inject(AuthService);

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    onSubmit() {
        if(this.loginForm.valid){
            const {email, password} = this.loginForm.value;
            if(email && password) {
                this.auth.login(email, password);
            }
        }
    }
}