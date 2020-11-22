import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Place } from '../place';
import { User } from '../user';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  currentUser: User;
  currentPlaces: Place[];
  loaded = false;
  deletePlaceFlag = true;
  maskedPlaceId = -1;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.refreshPlacesTable();
  }

  delete(placeId: number) {
    this.maskedPlaceId = placeId;
    let snackBarRef = this.snackBar.open('The place has been deleted', 'Undo', {
      duration: 2500,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (this.deletePlaceFlag) {
        this.dataService
          .deletePlace(placeId)
          .subscribe(() => this.refreshPlacesTable());
      }
    });
    snackBarRef.onAction().subscribe(() => {
      this.deletePlaceFlag = false;
      this.maskedPlaceId = -1;
    });
  }

  refreshPlacesTable(): void {
    this.loaded = false;
    this.dataService
      .getUserByEmail(this.activeRoute.snapshot.params['email'])
      .toPromise()
      .then((response) => {
        if (response.status != 404) {
          this.currentUser = response.body;
          this.dataService
            .getPlacesByOwnerId(this.currentUser.id)
            .subscribe((response) => {
              this.currentPlaces = response.body;
              this.loaded = true;
            });
        }
      });
  }
}
