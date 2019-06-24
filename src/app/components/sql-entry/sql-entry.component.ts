import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { DatabaseService } from "src/app/services/database.service";
import { Subscription } from "rxjs";
import { QueryHistoryService } from "src/app/services/query-history.service";
import { MatDialog } from "@angular/material";
import { TableInfoComponent } from "../modals/table-info/table-info.component";
import { QueryHistoryComponent } from "../modals/query-history/query-history.component";

@Component({
  selector: "app-sql-entry",
  templateUrl: "./sql-entry.component.html",
  styleUrls: ["./sql-entry.component.css"]
})
export class SqlEntryComponent implements OnInit, OnDestroy {
  sql = "";

  isLoading = true;
  loadingListener$: Subscription;

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService,
    private queryHistoryService: QueryHistoryService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadingListener$ = this.dbService
      .getLoadingListener()
      .subscribe(isLoading => {
        this.updateLoadingStatus(isLoading);
      });
  }

  ngOnDestroy() {
    this.loadingListener$.unsubscribe();
  }

  private updateLoadingStatus(isLoading) {
    this.ngZone.run(() => {
      this.isLoading = isLoading;
    });
  }

  showInfo() {
    this.dialog.open(TableInfoComponent, {
      width: "600px"
    });
  }

  showHistory() {
    const dialogRef = this.dialog.open(QueryHistoryComponent, {
      width: "600px"
    });

    dialogRef.afterClosed().subscribe(selectedSQL => {
      if (selectedSQL) {
        this.sql = selectedSQL;
      }
    });
  }

  executeSql() {
    const validInput = this.sql.trim().length > 0;

    if (validInput) {
      this.queryHistoryService.addToHistory(this.sql);
      this.dbService.execute(this.sql);
    }
  }
}
