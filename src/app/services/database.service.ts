import { Injectable } from "@angular/core";
import { ElectronService } from "ngx-electron";
import { Subject } from "rxjs";
import { TableData } from "../models/table.data";
import { ErrorService } from "./error.service";
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: "root"
})
export class DatabaseService {
  constructor(
    private errorService: ErrorService,
    private electronService: ElectronService,
    public snackBar: MatSnackBar
  ) {}

  private sqlite3 = this.electronService.remote.require("sqlite3").verbose();

  // Subjects for observables
  tableDataUpdated = new Subject<TableData>();
  loadingStatusUpdated = new Subject<boolean>();
  tableMetadataUpdated = new Subject<any>();

  private db;

  selectDatabase(callback) {
    const thisWindow = this.electronService.remote
      .require("electron")
      .BrowserWindow.getFocusedWindow();
    const options = {
      multiSelections: false,
      filters: [{ name: "SQLite database", extensions: ["db"] }],
      title: "Select database"
    };

    this.electronService.remote.dialog.showOpenDialog(
      thisWindow,
      options,
      selectedDbPathArray => {
        if (selectedDbPathArray) {
          callback(selectedDbPathArray[0]);
        }
      }
    );
  }

  getTableDataListener() {
    return this.tableDataUpdated;
  }

  getLoadingListener() {
    return this.loadingStatusUpdated;
  }

  getTableMetadataListener() {
    return this.tableMetadataUpdated;
  }

  getTableMetadata() {
    const SQL = `
      SELECT 
        name
      FROM 
        sqlite_master 
      WHERE 
        type = 'table' AND 
        name NOT LIKE 'sqlite_%'`;

    this.db.serialize(() => {
      this.db.all(SQL, (err, rows) => {
        if (err) {
          this.handleError(err);
        } else {
          const tableNames = rows.map(row => row.name);
          this.extractMetadata(tableNames);
        }
      });
    });
  }

  private extractMetadata(tableNames: string[]) {
    let tableMetadata = {};

    tableNames.forEach((val, i, arr) => {
      const sql = `PRAGMA table_info(${val})`;

      this.db.all(sql, (err, rows) => {
        if (err) {
          this.handleError(err);
        } else {
          tableMetadata[val] = rows;

          const isLastItem = Object.is(arr.length - 1, i);

          if (isLastItem) {
            this.tableMetadataUpdated.next(tableMetadata);
          }
        }
      });
    });
  }

  connect(dbPath) {
    this.updateLoadingStatus(true);

    this.db = new this.sqlite3.Database(
      dbPath,
      this.sqlite3.OPEN_READWRITE,
      err => {
        if (err) {
          this.handleError(err);
        } else {
          this.updateLoadingStatus(false);
        }
      }
    );
  }

  execute(SQL) {
    this.updateLoadingStatus(true);

    this.db.serialize(() => {
      this.db.all(SQL, (err, rows) => {
        if (err) {
          this.handleError(err);
        } else {
          this.updateTableData(rows);
        }
      });
    });
  }

  close() {
    this.updateLoadingStatus(true);

    this.db.close(err => {
      if (err) {
        this.handleError(err);
      } else {
        this.updateLoadingStatus(false);
      }
    });
  }

  private updateLoadingStatus(isLoading: boolean) {
    this.loadingStatusUpdated.next(isLoading);
  }

  private updateTableData(rows) {
    if (rows.length > 0) {
      const headings = Object.keys(rows[0]);
      this.tableDataUpdated.next({ headings: headings, rows: rows });
    } else {
      console.log("No rows!");
    }

    this.updateLoadingStatus(false);
  }

  private handleError(err) {
    this.errorService.showSqlError(err.message);
    this.updateLoadingStatus(false);
  }


  showSnack(message: string, type?: string, duration?: any) {
    this.snackBar.open(message, type, {
      duration: duration ? duration : 2000,
      panelClass: type === 'info' ? ['info'] : type === 'success' ? ['success'] : ['error'],
    });
  }
}
