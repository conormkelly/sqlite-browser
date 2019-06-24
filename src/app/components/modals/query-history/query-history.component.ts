import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { QueryHistoryItem } from 'src/app/models/query.history.item';
import { Subscription } from 'rxjs';
import { QueryHistoryService } from 'src/app/services/query-history.service';

@Component({
  selector: 'app-query-history',
  templateUrl: './query-history.component.html',
  styleUrls: ['./query-history.component.css']
})
export class QueryHistoryComponent implements OnInit {
  history: QueryHistoryItem[] = [];
  historyListener$: Subscription;

  constructor(
    private ngZone: NgZone,
    private dialogRef: MatDialogRef<QueryHistoryComponent>,
    private historyService: QueryHistoryService
  ) { }

  ngOnInit() {
    this.historyListener$ = this.historyService.getHistoryUpdatedListener().subscribe(history => {
      this.ngZone.run(() => {
        this.history = history;
      })
    });
  }

  ngOnDestroy() {
    this.historyListener$.unsubscribe();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  copyQuery(queryText) {
    this.dialogRef.close(queryText);
  }

}
