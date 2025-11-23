import { ErrorHandler, inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  private snackBar = inject(MatSnackBar);

  handleError(error: unknown): void {
    this.snackBar.open('Error was detected, we are already working on it!', 'Close', {
      duration: 2000
    });
    console.warn('Caught error', error);
  }
}
