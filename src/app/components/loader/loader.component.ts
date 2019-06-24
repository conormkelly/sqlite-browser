import { Component, OnInit, NgZone } from "@angular/core";
import { Subscription } from "rxjs";
import { DatabaseService } from "src/app/services/database.service";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit {
  isLoading = false;
  loadingListener$: Subscription;

  constructor(private ngZone: NgZone, private dbService: DatabaseService) {}

  ngOnInit() {
    this.loadingListener$ = this.dbService
      .getLoadingListener()
      .subscribe(isLoading => {
        this.updateLoadingStatus(isLoading);
      });
  }

  ngOnDestroy() {
    this.loadingListener$.unsubscribe();
  }

  private updateLoadingStatus(isLoading) {
    this.ngZone.run(() => {
      this.isLoading = isLoading;
    });
  }
}
