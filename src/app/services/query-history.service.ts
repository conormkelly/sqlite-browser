import { Injectable } from '@angular/core';
import { QueryHistoryItem } from '../models/query.history.item';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryHistoryService {
  private history: QueryHistoryItem[] = [];
  private historyUpdated = new BehaviorSubject<QueryHistoryItem[]>(this.history);

  getHistoryUpdatedListener() {
    return this.historyUpdated;
  }

  addToHistory(sql) {
    this.history.unshift({ text: sql, timestamp: new Date() });
    this.historyUpdated.next([...this.history]);
  }
}
