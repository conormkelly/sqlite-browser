import { Injectable } from '@angular/core';
import { QueryHistoryItem } from '../models/query.history.item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryHistoryService {
  private history: QueryHistoryItem[] = [];
  private historyUpdated = new Subject<QueryHistoryItem[]>();

  getHistoryUpdatedListener() {
    return this.historyUpdated;
  }

  addToHistory(sql) {
    this.history.push({ text: sql, timestamp: new Date() });
    this.historyUpdated.next([...this.history]);
  }
}
