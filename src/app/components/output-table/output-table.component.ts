import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css']
})
export class OutputTableComponent implements OnInit {

  tableDataListener$: Subscription;
  tableData = [];

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {

    this.tableDataListener$ = this.dbService.getTableDataListener().subscribe(tableData => {
      // Running in ngZone forces change detection
      this.ngZone.run(() => {
        this.tableData = tableData;
      });
    });

    // TODO: Remove this hardcoded connection
    this.dbService.connect('C:/Dev/sqlite-testing/chinook.db');
  }

  ngOnDestroy() {
    this.dbService.close();
    this.tableDataListener$.unsubscribe();
  }

}
