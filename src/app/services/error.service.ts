import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ErrorComponent } from '../components/modals/error/error.component';
import { TableInfoComponent } from '../components/modals/table-info/table-info.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  dialogIsOpen = false;

  showDialog(errorMessage) {

    if (!this.dialogIsOpen) {

      const dialog = this.dialog.open(ErrorComponent, {
        data: { errorMessage: errorMessage }
      });

      dialog.afterOpen().subscribe(() => {
        this.dialogIsOpen = true;
      })

      dialog.afterClosed().subscribe(() => {
        this.dialogIsOpen = false;
      })

    }

  }

  constructor(public dialog: MatDialog) { }
}
