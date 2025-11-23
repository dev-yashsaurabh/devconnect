import { JsonPipe } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { debounceTime, switchMap, tap } from "rxjs";

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

    ngOnInit(): void {
        this.name.valueChanges.pipe(
            tap(() => this.startTimer(5)),
            debounceTime(5000),
            switchMap((value) => this.http.get(`https://jsonplaceholder.typicode.com/todos/${value}`))
        ).subscribe((resp: any) => {
            this.post.set(resp);

        });
    }

    private startTimer(seconds: number) {
    this.timer.set(seconds);
    const interval = setInterval(() => {
      this.timer.update(t => t - 1);
      if (this.timer() <= 0) clearInterval(interval);
    }, 1000);
  }
}
