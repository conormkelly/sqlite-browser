import { Component, ViewChild, OnInit, NgZone, AfterViewInit, OnDestroy } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { TableData } from 'src/app/models/table.data';

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css']
})
export class OutputTableComponent implements OnInit, AfterViewInit, OnDestroy {
  tableData: TableData = {rows: [], headings: []};

  dataSource: MatTableDataSource<object[]>;

  @ViewChild('tablePaginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  tableDataListener$: Subscription;

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.tableData.rows);

    this.tableDataListener$ = this.dbService.getTableDataListener().subscribe(tableData => {
      // Running in ngZone forces change detection
      this.ngZone.run(() => {
        this.tableData = tableData;
        this.dataSource = new MatTableDataSource(tableData.rows);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });

    // TODO: Remove this hardcoded connection
    this.dbService.connect('C:/Dev/sqlite-testing/chinook.db');
  }

  ngAfterViewInit() {
    this.ngZone.run(() => {
      this.dataSource.paginator = this.paginator;
      console.log(this.paginator);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnDestroy() {
    this.dbService.close();
    this.tableDataListener$.unsubscribe();
  }

}
