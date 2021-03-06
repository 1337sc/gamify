import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Game } from '../game';
import { Place } from '../place';
import { Comment } from '../comment';
import { Advertisement } from '../advertisement';
import { UserPlaceSubscription } from '../user-place-subscription';

@Component({
  selector: 'app-place-about',
  templateUrl: './place-about.component.html',
  styleUrls: ['./place-about.component.scss'],
})
export class PlaceAboutComponent implements OnInit {
  currentPlace: Place;
  offeredGames: Game[];
  currentAds: Advertisement[];
  maskedGameId = -1;
  loaded = false;
  deleteGameFlag = true;
  curUserId: number;
  curPlaceComments: Comment[];

  constructor(
    private snackBar: MatSnackBar,
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {
    this.curUserId = Number.parseInt(localStorage.getItem('curUser'));
  }

  ngOnInit(): void {
    this.dataService
      .getPlaceAdvertisements(this.activeRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.currentAds = response.body;
      });
    this.dataService
      .getPlace(this.activeRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.currentPlace = response.body;
        this.refreshGamesTable();
        this.dataService
          .getPlaceComments(this.currentPlace.id)
          .subscribe((response) => (this.curPlaceComments = response.body));
      });
  }

  delete(gameId: number) {
    this.maskedGameId = gameId;
    let snackBarRef = this.snackBar.open('The game has been deleted', 'Undo', {
      duration: 2500,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (this.deleteGameFlag) {
        this.dataService
          .deleteGame(gameId)
          .subscribe(() => this.refreshGamesTable());
        this.deleteGameFlag = true;
      }
    });
    snackBarRef.onAction().subscribe(() => {
      this.deleteGameFlag = false;
      this.maskedGameId = -1;
    });
  }

  refreshGamesTable(): void {
    this.loaded = false;
    this.dataService
      .getPlaceGames(this.currentPlace.id)
      .subscribe((response) => {
        this.offeredGames = response.body;
        this.loaded = true;
      });
  }

  subscribe() {
    this.dataService
      .createUserPlaceSubscription(
        new UserPlaceSubscription(0, this.curUserId, this.currentPlace.id)
      )
      .subscribe();
  }
}
