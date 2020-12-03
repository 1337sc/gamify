import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Place } from '../place';
import { User } from '../user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Game } from '../game';
import { UserWishedGame } from '../uwg'
import { HttpResponse } from '@angular/common/http';
import { from } from 'rxjs';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss'],
})
export class CabinetComponent implements OnInit {
  currentUser: User;
  currentPlaces: Place[];
  currentWishList: Game[];
  loaded = false;
  deletePlaceFlag = true;
  maskedPlaceId = -1;
  tableMode: boolean = true;   
  uwg : UserWishedGame = new UserWishedGame(); 

  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}


  ngOnInit(): void {
    this.dataService
      .getUser(Number.parseInt(localStorage.getItem('curUser')))
      .subscribe((response) => {
        this.currentUser = response.body;
        this.refreshPlacesTable();
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
      .getPlacesByOwnerId(this.currentUser.id)
      .subscribe((response) => {
        this.currentPlaces = response.body;
        this.loaded = true;
      });
  }

  save(){
    this.dataService.createUserWishedGame(this.uwg)
    .subscribe((response) => this.uwg = response.body)
    this.cancel();
}
cancel() {
  this.uwg = new UserWishedGame();
  this.tableMode = true;
}
}
