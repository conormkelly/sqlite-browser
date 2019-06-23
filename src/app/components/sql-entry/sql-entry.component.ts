import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription } from 'rxjs';
import { QueryHistoryService } from 'src/app/services/query-history.service';

@Component({
  selector: 'app-sql-entry',
  templateUrl: './sql-entry.component.html',
  styleUrls: ['./sql-entry.component.css']
})
export class SqlEntryComponent implements OnInit, OnDestroy {
  sql = '';

  isLoading = true;
  loadingListener$: Subscription;

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService,
    private queryHistoryService: QueryHistoryService
    ) { }

  ngOnInit() {
    this.loadingListener$ = this.dbService.getLoadingListener().subscribe(isLoading => {
      this.updateLoadingStatus(isLoading);
    })
  }

  ngOnDestroy() {
    this.loadingListener$.unsubscribe();
  }

  private updateLoadingStatus(isLoading) {
    this.ngZone.run(() => {
      this.isLoading = isLoading;
    });
  }

  executeSql() {
    this.queryHistoryService.addToHistory(this.sql);
    this.dbService.execute(this.sql);
  }

}
