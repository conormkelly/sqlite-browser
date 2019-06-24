import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

// import { CdkTableModule } from '@angular/cdk/table';

import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';
import { SqlEntryComponent } from './components/sql-entry/sql-entry.component';
import { OutputTableComponent } from './components/output-table/output-table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { DatabaseSelectComponent } from './components/modals/database-select/database-select.component';
import { TableInfoComponent } from './components/modals/table-info/table-info.component';
import { TableDetailComponent } from './components/modals/table-info/table-detail/table-detail.component';
import { QueryHistoryComponent } from './components/modals/query-history/query-history.component';
import { ErrorComponent } from './components/modals/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    SqlEntryComponent,
    OutputTableComponent,
    LoaderComponent,
    DatabaseSelectComponent,
    TableInfoComponent,
    TableDetailComponent,
    QueryHistoryComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxElectronModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DatabaseSelectComponent, TableInfoComponent, QueryHistoryComponent, ErrorComponent]
})
export class AppModule { }
