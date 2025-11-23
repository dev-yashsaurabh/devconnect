import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
    selector: `dev-http`,
    templateUrl: './dev-http.html',
    styleUrl: './dev-http.scss'
})
export class DevHttp {
    posts: any = [];
    constructor(private http: HttpClient) {
        this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((response: any) => {
            this.posts = response;
            console.log(this.posts)
        })
    }
}
