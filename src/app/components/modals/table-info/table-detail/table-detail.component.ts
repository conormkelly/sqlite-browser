import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrls: ['./table-detail.component.css']
})
export class TableDetailComponent {
  isCollapsed = true;

  @Input('tableName') tableName;
  @Input('columnData') columnData;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
