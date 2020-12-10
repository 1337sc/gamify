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
import { FormControl } from '@angular/forms';
import { User } from '../user';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  category = 'place';
  elements: Place[] | User[];

  searchCtrl: FormControl = new FormControl('');
  selectCtrl: FormControl = new FormControl(SearchType.Places);

  searchTypeOptions = [{ text: 'Places', value: SearchType.Places }];

  currentUser: User;

  constructor(private dataService: DataService) {
    if (localStorage.getItem('curUser')) {
      this.searchTypeOptions.push({ text: 'User', value: SearchType.User });
      this.selectCtrl.setValue(SearchType.User);
    } else {
      this.selectCtrl.disable();
    }
  }

  get isFilterByUser() {
    return this.selectCtrl.value == SearchType.User;
  }

  ngOnInit(): void {
    this.dataService
      .getUser(Number.parseInt(localStorage.getItem('curUser')))
      .subscribe((response) => {
        this.currentUser = response.body;
        this.reloadData();
      });

    this.searchCtrl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(300))
      .subscribe(() => this.reloadData());

    this.selectCtrl.valueChanges.subscribe(() => this.reloadData());
  }

  reloadData() {
    const value = (this.searchCtrl.value as string).toLowerCase();
    this.elements = [];
    switch (+this.selectCtrl.value) {
      case SearchType.User:
        this.dataService
          .getUserWithGames(this.currentUser.id, value)
          .subscribe((data) => (this.elements = data));
        break;
      case SearchType.Places:
        this.dataService
          .getPlacesByName(value)
          .subscribe((r) => (this.elements = r.body));
        break;
    }
  }

  clearResults(): void {
    this.searchCtrl.setValue('');
  }
}

enum SearchType {
  User = 1,
  Places = 2,
}
