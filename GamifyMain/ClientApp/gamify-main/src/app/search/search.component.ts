import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { fromEvent } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
} from 'rxjs/operators';
import { Place } from '../place';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  category = 'place';
  elements: Place[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    const search = document.getElementById('searchInput');

    fromEvent(search, 'input')
      .pipe(
        map((e) => (<HTMLInputElement>e.target).value),
        debounceTime(1500),
        distinctUntilChanged(),
        filter(v => v.length != 0)
      )
      .subscribe((value) =>
        this.dataService
          .getPlacesByName(value)
          .subscribe((response) => (this.elements = response.body))
      );
  }

  clearResults(): void {
    document.getElementById('searchResults').innerHTML = '';
  }
}
