import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../data.service';
import { Place } from '../place';

@Component({
  selector: 'app-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.scss'],
})
export class PlaceCreateComponent implements OnInit {
  createdPlace = new Place(0, '', '', 0.1, 0.1, 0);
  formProps: any;
  loaded = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    activeRoute: ActivatedRoute
  ) {
    this.createdPlace.ownerId = Number.parseInt(
      activeRoute.snapshot.params['id']
    );
  }

  ngOnInit(): void {
    this.formProps = { place: this.createdPlace, editing: false };
    this.loaded = true;
  }

  save() {
    this.dataService
      .createPlace(this.createdPlace)
      .subscribe(() => this.router.navigateByUrl('/cabinet'));
  }
}
