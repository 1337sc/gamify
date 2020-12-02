import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../data.service';
import { Place } from '../place';

@Component({
  selector: 'app-place-edit',
  templateUrl: './place-edit.component.html',
  styleUrls: ['./place-edit.component.scss'],
})
export class PlaceEditComponent implements OnInit {
  editedPlace: Place;
  editedPlaceId: number;
  formProps: any;
  loaded = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    activeRoute: ActivatedRoute
  ) {
    this.editedPlaceId = Number.parseInt(activeRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.dataService.getPlace(this.editedPlaceId).subscribe((response) => {
      this.editedPlace = response.body;
      this.formProps = { place: this.editedPlace, editing: true };
      this.loaded = true;
    });
  }

  save() {
    this.dataService
      .updatePlace(this.editedPlace)
      .subscribe(() => this.router.navigateByUrl('/cabinet'));
  }
}
