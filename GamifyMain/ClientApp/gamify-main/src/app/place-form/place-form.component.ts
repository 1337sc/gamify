import { Component, Input, OnInit } from '@angular/core';
import { Place } from '../place';
@Component({
  selector: 'place-form',
  templateUrl: './place-form.component.html',
  styleUrls: ['./place-form.component.scss'],
})
export class PlaceFormComponent implements OnInit {
  @Input() props: { place: Place; editing: boolean };

  currentLat: number;
  currentLong: number;

  ngOnInit(): void {
    if (!this.props.editing) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
    } else {
      this.currentLat = this.props.place.coordLat;
      this.currentLong = this.props.place.coordLon;
    }
  }

  dragEnd($event: any) {
    this.props.place.coordLat = $event.latLng.lat();
    this.props.place.coordLon = $event.latLng.lng();
  }
}
