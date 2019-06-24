import { Component, Inject, NgZone, AfterViewInit, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ErrorComponent>,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.ngZone.run(() => {
      this.errorMessage = this.data.errorMessage;
    });
  }

  close() {
    console.log('close was clicked...');
    this.dialogRef.close();
  }

}
