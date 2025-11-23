import { JsonPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, debounceTime, of, switchMap, tap } from "rxjs";

@Component({
    selector: 'dev-switch',
    templateUrl: './dev-switch.html',
    styleUrl: './dev-switch.scss',
    imports: [MatInputModule, ReactiveFormsModule, JsonPipe]
})
export class SwitchMapComponent implements OnInit {
    private http = inject(HttpClient);
    post = signal<any>({});
    name = new FormControl('');
    timer = signal(0);
    private snackBar = inject(MatSnackBar);

    ngOnInit(): void {
        this.name.valueChanges.pipe(
            tap(() => this.startTimer(5)),
            debounceTime(5000),
            switchMap((value) => this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`).
                        pipe(
                            catchError((err) => {
                            this.snackBar.open('API call failed!', 'Close', { duration: 3000 });
                            return of(err);
                    }))
                ),
            ).subscribe((resp: any) => {
            this.post.set(resp);

        });
    }

    private timerInterval: any;

    private startTimer(seconds: number) {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.timer.set(seconds);

        this.timerInterval = setInterval(() => {
            this.timer.update(t => {
                if (t <= 1) {
                    clearInterval(this.timerInterval);
                    this.timerInterval = null;
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
    }
}
