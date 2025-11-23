import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";

@Component({
    selector: 'dev-http',
    templateUrl: './dev-http.html',
    styleUrls: ['./dev-http.scss'],
    standalone: true,
})
export class DevHttp implements OnInit {
    posts: any = [];
    jsonData: any = [];

    private http = inject(HttpClient);
    private cdr = inject(ChangeDetectorRef);

    ngOnInit(): void {
        this.http.get('https://jsonplaceholder.typicode.com/users')
            .subscribe((response: any) => {
                this.posts = response;
                console.log(this.posts);
                this.cdr.detectChanges();
            });

        this.http.get('/data.json')
            .subscribe(resp => {
                this.jsonData = resp;
                this.cdr.detectChanges();
                console.log(this.jsonData);
            });
    }
}
