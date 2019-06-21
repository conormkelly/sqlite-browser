import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-sql-entry',
  templateUrl: './sql-entry.component.html',
  styleUrls: ['./sql-entry.component.css']
})
export class SqlEntryComponent {
  sql = '';

  constructor(private dbService: DatabaseService) { }

  executeSql() {
    this.dbService.execute(this.sql);
  }

}
