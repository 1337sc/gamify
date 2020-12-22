import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Place } from '../place';
import { User } from '../user';
import { Game } from '../game';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  currentUser: User;
  currentSubscriptions: Place[];
  currentPlaces: Place[];
  currentWishList: Game[];
  loaded = false;
  deletePlaceFlag = true;
  maskedPlaceId = -1;
  maskedGameId: number;
  deleteGameFlag: any;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataService
      .getUser(Number.parseInt(localStorage.getItem('curUser')))
      .subscribe((response) => {
        this.currentUser = response.body;
        this.refreshTable();
      });
    this.dataService
      .getUserSubscriptions(Number.parseInt(localStorage.getItem('curUser')))
      .subscribe((response) => {
        this.currentSubscriptions = response.body;
      });
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
          .subscribe(() => this.refreshTable());
      }
    });
    snackBarRef.onAction().subscribe(() => {
      this.deletePlaceFlag = false;
      this.maskedPlaceId = -1;
    });
  }

  deleteWishedGame(gameId: number) {
    this.maskedGameId = gameId;
    let snackBarRef = this.snackBar.open('The game has been deleted', 'Undo', {
      duration: 2500,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (this.deleteGameFlag) {
        this.dataService
          .deleteGame(gameId)
          .subscribe(() => this.refreshTable());
      }
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteGameFlag = false;
      this.maskedGameId = -1;
    });
  }

  refreshTable(): void {
    if (this.currentUser.role == 'placeOwner') {
      this.loaded = false;
      this.dataService
        .getPlacesByOwnerId(this.currentUser.id)
        .subscribe((response) => {
          this.currentPlaces = response.body;
          this.loaded = true;
        });
    }
    if (this.currentUser.role == 'user') {
      this.loaded = false;
      this.dataService
        .getUserWishlist(this.currentUser.id)
        .subscribe((response) => {
          this.currentWishList = response.body;
          this.loaded = true;
        });
    }
  }
}
