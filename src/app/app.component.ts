import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Subscription } from 'rxjs';
import { FormattingService } from './services/formatting.service';
import { MatDialog } from '@angular/material';
import { DatabaseSelectComponent } from './components/modals/database-select/database-select.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    const dialogRef = this.dialog.open(DatabaseSelectComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
