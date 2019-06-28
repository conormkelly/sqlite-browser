import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar
  ) {}

  showSnack(message: string, type?: string, duration?: any) {
    this.snackBar.open(message, type, {
      duration: duration ? duration : 2000,
      panelClass:
        type === "info"
          ? ["info"]
          : type === "success"
          ? ["success"]
          : ["error"]
    });
  }
}
