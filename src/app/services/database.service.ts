import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Subject } from 'rxjs';
import { FormattingService } from './formatting.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(
    private electronService: ElectronService,
    private formattingService: FormattingService
  ) { }

  sqlite3 = this.electronService.remote.require('sqlite3').verbose();

  private db;

  private tableDataUpdated = new Subject<any>();
  private loadingStatusUpdated = new Subject<boolean>();

  getTableDataListener() {
    return this.tableDataUpdated;
  }

  getLoadingListener() {
    return this.loadingStatusUpdated;
  }

  connect(dbPath) {
    this.loadingStatusUpdated.next(true);

    this.db = new this.sqlite3.Database(
      dbPath,
      this.sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          //! Add error handling
          throw err;
        } else {
          this.loadingStatusUpdated.next(false);
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
          if (rows.length >= 1) {
            const tableData = this.formattingService.extractTableData(rows);
            this.tableDataUpdated.next(tableData);
          } else {
            console.log(rows);
          }
        }
        this.loadingStatusUpdated.next(false);
      });
    });
  }

  close() {
    this.loadingStatusUpdated.next(true);

    this.db.close((err) => {
      if (err) {
        //! Add error handling
        throw err;
      } else {
        this.loadingStatusUpdated.next(false);
      }
    });
  }
}
