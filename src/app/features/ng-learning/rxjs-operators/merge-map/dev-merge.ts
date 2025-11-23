import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { from, mergeMap } from "rxjs";

@Component({
    selector: 'dev-merge',
    templateUrl: './dev-merge.html',
    styleUrl: './dev-merge.scss',
    imports: [MatListModule, MatIconModule]
})
export class MergeMapComponent {
    private http = inject(HttpClient);
    users: any[] = [];
    private cdr = inject(ChangeDetectorRef);

    ngOnInit() {
        const userIds = [1, 2, 3, 4, 5];

        // from - Convert array to observable
        from(userIds)
        .pipe(
            mergeMap(id => this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`))
        )
        .subscribe((user: any) => {
            this.users.push(user);
            this.cdr.detectChanges();
        });
    }
}
