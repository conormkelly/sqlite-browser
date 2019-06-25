// Angular
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Material
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppMaterialModule } from "./modules/app-material/app-material.module";

import { NgxElectronModule } from "ngx-electron";

// Components
import { AppComponent } from "./app.component";
import { SqlEntryComponent } from "./components/sql-entry/sql-entry.component";
import { OutputTableComponent } from "./components/output-table/output-table.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { DatabaseSelectComponent } from "./components/modals/database-select/database-select.component";
import { TableInfoComponent } from "./components/modals/table-info/table-info.component";
import { TableDetailComponent } from "./components/modals/table-info/table-detail/table-detail.component";
import { QueryHistoryComponent } from "./components/modals/query-history/query-history.component";

@NgModule({
  declarations: [
    AppComponent,
    SqlEntryComponent,
    OutputTableComponent,
    LoaderComponent,
    DatabaseSelectComponent,
    TableInfoComponent,
    TableDetailComponent,
    QueryHistoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxElectronModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DatabaseSelectComponent,
    TableInfoComponent,
    QueryHistoryComponent
  ]
})
export class AppModule {}
