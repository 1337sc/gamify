import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';
import { Place } from '../place';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-place-about',
  templateUrl: './place-about.component.html',
  styleUrls: ['./place-about.component.scss'],
})
export class PlaceAboutComponent implements OnInit {
  currentPlace: Place;
  offeredGames: Game[];
  loaded = false;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataService
      .getPlace(this.activeRoute.snapshot.params['id'])
      .subscribe((response) => {
        this.currentPlace = response.body;
        this.dataService
          .getPlaceGames(this.currentPlace.id)
          .subscribe((response) => {
            this.offeredGames = response.body;
          });
        this.loaded = true;
      });
  }
}
