import {
  Component,
  ViewChild,
  OnInit,
  NgZone,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  HostListener
} from '@angular/core';

import { MatPaginator, MatTableDataSource, MatTable } from '@angular/material';

import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { TableData } from 'src/app/models/table.data';

@Component({
  selector: 'app-output-table',
  templateUrl: './output-table.component.html',
  styleUrls: ['./output-table.component.css']
})
export class OutputTableComponent implements OnInit, AfterViewInit, OnDestroy {
  // Table elements
  @ViewChild(MatTable, { read: ElementRef, static: true })
  private matTableRef: ElementRef;
  @ViewChild('tablePaginator', { static: true }) paginator: MatPaginator;

  // Subscription
  tableDataListener$: Subscription;

  // Template Data
  tableData: TableData = { rows: [], headings: [] };
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<object[]>;

  // Resizing
  mouseIsPressed = false;
  currentResizeColumnIndex: number;
  startX: number;
  startWidth: number;
  isResizingRight: boolean;
  resizableMousemove: () => void;
  resizableMouseup: () => void;

  constructor(
    private renderer: Renderer2,
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(_event) {
    this.setTableResize(this.matTableRef.nativeElement.clientWidth);
  }

  ngOnInit() {
    this.setTableProperties(this.tableData);

    // Set up subscription
    this.tableDataListener$ = this.dbService
      .getTableDataListener()
      .subscribe(tableData => {
        this.setTableProperties(tableData);
      });
  }

  setDisplayedColumns() {
    this.displayedColumns = this.tableData.headings.map(
      heading => heading.name
    );
  }

  ngAfterViewInit() {
    this.setTableProperties(this.tableData);
  }

  setTableProperties(tableData: TableData) {
    this.ngZone.run(() => {
      this.tableData = tableData;
      this.setDisplayedColumns();
      this.dataSource = new MatTableDataSource(this.tableData.rows);
      this.dataSource.paginator = this.paginator;
      this.setTableResize(this.matTableRef.nativeElement.clientWidth);
    });
  }

  setTableResize(tableWidth: number) {
    const isTableData = this.tableData.headings.length > 0;

    if (isTableData) {
      const totalColumnWidth = this.tableData.headings.reduce(
        (acc, column) => acc + column.width,
        0
      );

      const scale = (tableWidth - 5) / totalColumnWidth;
      this.tableData.headings.forEach(column => {
        column.width *= scale;
        this.setColumnWidth(column);
      });
    }
  }

  setColumnWidth(column: any) {
    setTimeout(() => {
      const columnClass = `cdk-column-${this.capitalise(column.name)}`;

      const columnElements = Array.from(
        document.getElementsByClassName(columnClass)
      );

      columnElements.forEach((el: HTMLElement) => {
        el.style.width = column.width + 'px';
      });
    });
  }

  private capitalise(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onResizeColumn(event, columnIndex) {
    this.checkResizing(event, columnIndex);
    this.currentResizeColumnIndex = columnIndex;
    this.mouseIsPressed = true;
    this.startX = event.pageX;
    this.startWidth = event.target.clientWidth;
    event.preventDefault();
    this.mouseMove(columnIndex);
  }

  private checkResizing(event, index) {
    const cellData = this.getCellData(index);
    if (
      index === 0 ||
      (Math.abs(event.pageX - cellData.right) < cellData.width / 2 &&
        index !== this.tableData.headings.length - 1)
    ) {
      this.isResizingRight = true;
    } else {
      this.isResizingRight = false;
    }
  }

  private getCellData(index: number) {
    const headerRow = this.matTableRef.nativeElement.children[0];
    const cell = headerRow.children[index];
    return cell.getBoundingClientRect();
  }

  mouseMove(index: number) {
    this.resizableMousemove = this.renderer.listen(
      'document',
      'mousemove',
      event => {
        if (this.mouseIsPressed && event.buttons) {
          const dx = this.isResizingRight
            ? event.pageX - this.startX
            : -event.pageX + this.startX;

          const width = this.startWidth + dx;

          if (this.currentResizeColumnIndex === index && width > 50) {
            this.setColumnWidthChanges(index, width);
          }
        }
      }
    );
    this.resizableMouseup = this.renderer.listen(
      'document',
      'mouseup',
      _event => {
        if (this.mouseIsPressed) {
          this.mouseIsPressed = false;
          this.currentResizeColumnIndex = -1;
          this.resizableMousemove();
          this.resizableMouseup();
        }
      }
    );
  }

  setColumnWidthChanges(columnIndex: number, width: number) {
    const originalWidth = this.tableData.headings[columnIndex].width;
    const dx = width - originalWidth;

    if (dx !== 0) {
      const adjacentColumnIndex = this.isResizingRight
        ? columnIndex + 1
        : columnIndex - 1;
      const newWidth = this.tableData.headings[adjacentColumnIndex].width - dx;

      if (newWidth > 50) {
        this.tableData.headings[columnIndex].width = width;
        this.setColumnWidth(this.tableData.headings[columnIndex]);
        this.tableData.headings[adjacentColumnIndex].width = newWidth;
        this.setColumnWidth(this.tableData.headings[adjacentColumnIndex]);
      }
    }
  }

  ngOnDestroy() {
    this.dbService.close();
    this.tableDataListener$.unsubscribe();
  }
}
