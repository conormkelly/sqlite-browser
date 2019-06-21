import { Injectable } from '@angular/core';
import { TableData } from '../models/table.data';

@Injectable({
  providedIn: 'root'
})
export class FormattingService {

  constructor() { }

  extractTableData(rows: object[]): TableData {

    const columnHeadings = Object.keys(rows[0]);

    const rowValues = rows.map(row => {
      return this.unpackRowValues(columnHeadings, row);
    });

    return { headings: columnHeadings, rows: rowValues };
  }

  private unpackRowValues(columnHeadings, row): any[] {
    return columnHeadings.reduce((arr, key) => {
      return arr.concat(row[key]);
    }, []);
  }
}
