import { Component, OnInit } from '@angular/core';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    //! Temporarily auto-connect to chinook for development purposes
    this.dbService.connect('./sqlite-example-db/chinook.db');
  }
}
