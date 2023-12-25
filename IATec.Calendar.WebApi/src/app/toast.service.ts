import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private snackbar: MatSnackBar) { }

  error(message: string): void {
    this.snackbar.open(message, '', { panelClass: 'error' });
  }

  success(message: string): void {
    this.snackbar.open(message, '', { panelClass: 'success' });
  }

  warning(message: string): void {
    this.snackbar.open(message, '', { panelClass: 'warning' });
  }
}
