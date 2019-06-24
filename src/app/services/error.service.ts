import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";

@Injectable({
  providedIn: "root"
})
export class ErrorService {
  showSqlError(errorMessage) {
    this.displayDialog("SQL Error", errorMessage);
  }

  private displayDialog(title, message) {
    // Delays opening to allow view to update
    setTimeout(() => {
      this.electronService.remote.dialog.showErrorBox(title, message);
    }, 100);
  }

  constructor(private electronService: ElectronService) {}
}
