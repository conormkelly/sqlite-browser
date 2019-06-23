import { Component, OnInit, NgZone } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table-info',
  templateUrl: './table-info.component.html',
  styleUrls: ['./table-info.component.css']
})
export class TableInfoComponent implements OnInit {
  tableMetadata = [];
  tableMetadataListener$: Subscription;

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    this.tableMetadataListener$ = this.dbService.getTableMetadataListener().subscribe(tableMetadata => {
      this.ngZone.run(() => {
        this.tableMetadata = tableMetadata;
      });
    });

    this.dbService.getTableMetadata();
  }

  ngOnDestroy() {
    this.tableMetadataListener$.unsubscribe();
  }

}
