import { Component, Input } from '@angular/core';
import { ColumnData } from 'src/app/models/column.data';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent {
  isCollapsed = true;

  @Input('tableName') tableName;
  @Input('columnData') columnData: ColumnData[];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
