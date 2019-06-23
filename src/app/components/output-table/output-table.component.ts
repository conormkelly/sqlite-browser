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
  @ViewChild('tablePaginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  tableData: TableData = { rows: [], headings: [] };
  tableDataListener$: Subscription;

  dataSource: MatTableDataSource<object[]>;

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    this.setTableProperties(this.tableData);

    this.tableDataListener$ = this.dbService.getTableDataListener().subscribe(tableData => {
      this.setTableProperties(tableData);
    });

    // TODO: Remove this hardcoded connection
    this.dbService.connect('./chinook.db');
  }

  ngAfterViewInit() {
    this.setTableProperties(this.tableData);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  setTableProperties(tableData: TableData) {
    this.ngZone.run(() => {
      this.tableData = tableData;
      this.dataSource = new MatTableDataSource(this.tableData.rows);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.dbService.close();
    this.tableDataListener$.unsubscribe();
  }

}
