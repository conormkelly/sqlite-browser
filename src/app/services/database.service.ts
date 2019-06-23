import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs';
import { TableData } from '../models/table.data';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private electronService: ElectronService
  ) { }

  private sqlite3 = this.electronService.remote.require('sqlite3').verbose();

  // Subjects for observables
  tableDataUpdated = new Subject<TableData>();
  loadingStatusUpdated = new Subject<boolean>();

  private db;

  selectDatabase(callback) {
    const thisWindow = this.electronService.remote.require('electron').BrowserWindow.getFocusedWindow();
    const options = {
      multiSelections: false,
      filters: [{ name: 'SQLite database', extensions: ['db'] }],
      title: 'Select database'
    };

    this.electronService.remote.dialog.showOpenDialog(
      thisWindow, options, (selectedDbPathArray) => {
        if (selectedDbPathArray) {
          callback(selectedDbPathArray[0]);
        }
      });
  }

  getTableDataListener() {
    return this.tableDataUpdated;
  }

  getLoadingListener() {
    return this.loadingStatusUpdated;
  }

  connect(dbPath) {
    this.updateLoadingStatus(true);

    this.db = new this.sqlite3.Database(
      dbPath,
      this.sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          //! Add error handling
          throw err;

        } else {
          this.updateLoadingStatus(false);
        }
      });
  }

  execute(SQL) {
    this.loadingStatusUpdated.next(true);

    this.db.serialize(() => {
      this.db.all(SQL, (err, rows) => {
        if (err) {
          //! Add error handling
          throw err;
        } else {
          this.updateTableData(rows);
        }
      });
    });
  }

  close() {
    this.updateLoadingStatus(true);

    this.db.close((err) => {
      if (err) {
        //! Add error handling
        throw err;

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
      console.log('No rows!');
    }

    this.updateLoadingStatus(false);
  }
}
