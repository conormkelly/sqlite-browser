import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {
  tableNames = [];
  tableMetadata = [];
  tableMetadataListener$: Subscription;

  constructor(
    private dialogRef: MatDialogRef<TableInfoComponent>,
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) {}

  ngOnInit() {
    this.tableMetadataListener$ = this.dbService
      .getTableMetadataListener()
      .subscribe(tableMetadata => {
        this.ngZone.run(() => {
          this.tableNames = Object.keys(tableMetadata);
          this.tableMetadata = tableMetadata;
        });
      });

    this.dbService.getTableMetadata();
  }

  ngOnDestroy() {
    this.tableMetadataListener$.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
