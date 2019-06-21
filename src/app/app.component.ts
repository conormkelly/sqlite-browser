import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Subscription } from 'rxjs';
import { FormattingService } from './services/formatting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sql = '';

  tableDataListener$: Subscription;
  tableData = [];

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService,
    public formatter: FormattingService
  ) { }

  ngOnInit() {

    this.tableDataListener$ = this.dbService.getTableDataListener().subscribe(tableData => {

      // Running in ngZone forces change detection
      this.ngZone.run(() => {
        this.tableData = tableData;
      });
    });

    // Connect
    this.dbService.connect('C:/Dev/sqlite-testing/chinook.db');
  }

  executeSql() {
    this.dbService.execute(this.sql);
  }

  ngOnDestroy() {
    this.dbService.close();
    this.tableDataListener$.unsubscribe();
  }

}
