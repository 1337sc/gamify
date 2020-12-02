import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Place } from '../place';

const searchRadius = 120;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  currentLat = 0.1;
  currentLong = 0.1;
  loaded = false;
  placesNearBy: Place[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.currentLat = position.coords.latitude;
      this.currentLong = position.coords.longitude;
      this.dataService
        .getPlacesInRadius(searchRadius, this.currentLat, this.currentLong)
        .subscribe((response) => {
          if (response.status != 404) {
            this.placesNearBy = response.body;
          }
          this.loaded = true;
        });
    });
  }
}
