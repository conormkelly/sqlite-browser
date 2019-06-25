import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  MatButtonModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from "@angular/material";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ]
})
export class AppMaterialModule {}
