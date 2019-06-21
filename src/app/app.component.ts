import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { Subscription } from 'rxjs';
import { FormattingService } from './services/formatting.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
