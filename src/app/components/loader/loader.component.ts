import { Component, OnInit, NgZone } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  isLoading = true;
  loadingListener$: Subscription;

  constructor(
    private ngZone: NgZone,
    private dbService: DatabaseService
  ) { }

  ngOnInit() {
    this.loadingListener$ = this.dbService.getLoadingListener().subscribe(isLoading => {
      this.ngZone.run(() => {
        console.log(isLoading);
        this.isLoading = isLoading;
      });
    })
  }

  ngOnDestroy() {
    this.loadingListener$.unsubscribe();
  }

}
