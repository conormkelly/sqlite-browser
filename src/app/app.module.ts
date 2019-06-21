import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxElectronModule } from 'ngx-electron'

import { AppComponent } from './app.component';
import { SqlEntryComponent } from './components/sql-entry/sql-entry.component';
import { OutputTableComponent } from './components/output-table/output-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SqlEntryComponent,
    OutputTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxElectronModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
