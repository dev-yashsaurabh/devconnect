import { Component } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";

@Component({
    selector: 'app-login',
    templateUrl: './login.html',
    styleUrls: ['./login.scss'],
    imports: []
})
export class Login {
    loginForm;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: new FormControl(''),
            password: new FormControl('')
        })
    }
}