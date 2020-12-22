import { Component, OnInit } from '@angular/core';
import { DataService, UserContact } from '../data.service';
import { Place } from '../place';
import { User } from '../user';
import { Game } from '../game';

import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  currentUser: User;
  currentPlaces: Place[];
  currentWishList: Game[];
  currentUserContats: UserContact[];
  loaded = false;
  deletePlaceFlag = true;
  maskedPlaceId = -1;
  maskedGameId: number;
  deleteGameFlag: any;

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataService
      .getUser(Number.parseInt(localStorage.getItem('curUser')))
      .subscribe((response) => {
        this.currentUser = response.body;
        this.refreshTable();
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

  deleteContact(userId: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService
          .deleteContact(this.currentUser.id, userId)
          .subscribe(() => {
            this.refreshTable();
            this.snackBar.open(
              'Contact has been successfully deleted',
              'Delete',
              {
                duration: 2500,
              }
            );
          });
      }
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
      forkJoin(
        this.dataService.getUserWishlist(this.currentUser.id),
        this.dataService.getContactsByUser(this.currentUser.id)
      ).subscribe(([response, userContacts]) => {
        this.currentWishList = response.body;
        this.currentUserContats = userContacts;
        this.loaded = true;
      });
    }
  }
}
