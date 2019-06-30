import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-database-select',
  templateUrl: './database-select.component.html',
  styleUrls: ['./database-select.component.css']
})
export class DatabaseSelectComponent implements OnInit {
  constructor(
    private dbService: DatabaseService,
    private dialogRef: MatDialogRef<DatabaseSelectComponent>
  ) {}

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  selectDatabase() {
    this.dbService.selectDatabase(dbPath => {
      this.dbService.connect(dbPath);
      this.dialogRef.close();
    });
  }
}
