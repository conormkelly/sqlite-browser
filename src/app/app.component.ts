import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { DatabaseSelectComponent } from "./components/modals/database-select/database-select.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.dialog.open(DatabaseSelectComponent, {
      width: "250px"
    });
  }
}
