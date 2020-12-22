import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { Game } from '../game';
import { Place } from '../place';
import { User } from '../user';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  allUsers: User[];
  allPlaces: Place[];
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
      .getPlaces()
      .subscribe((response) => (this.allPlaces = response.body));
    this.dataService
      .getUsers('\0')
      .subscribe((response) => (this.allUsers = response));
    this.loaded = true;
  }

  deletePlace(placeId: number) {
    this.maskedPlaceId = placeId;
    let snackBarRef = this.snackBar.open('The place has been deleted', 'Undo', {
      duration: 2500,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      if (this.deletePlaceFlag) {
        this.dataService.deletePlace(placeId).subscribe();
      }
    });
    snackBarRef.onAction().subscribe(() => {
      this.deletePlaceFlag = false;
      this.maskedPlaceId = -1;
    });
  }
}
