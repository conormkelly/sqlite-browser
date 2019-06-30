import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { A11yModule } from '@angular/cdk/a11y';

import {
  MatButtonModule,
  MatDialogModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ],
  exports: [
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule
  ]
})
export class AppMaterialModule {}
