import { Component, OnInit } from '@angular/core';
import { DataService, UserContact } from '../data.service';
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
import { UserGames } from '../models/UserGames';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  category = 'place';
  elements: Place[] | UserGames[];

  searchCtrl: FormControl = new FormControl('');
  selectCtrl: FormControl = new FormControl(SearchType.Places);

  searchTypeOptions = [{ text: 'Places', value: SearchType.Places }];

  currentUser: User;

  userContacts: UserContact[] = [];

  constructor(private dataService: DataService, private snackBar: MatSnackBar) {
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
    this.dataService
      .getContactsByUser(this.currentUser.id)
      .subscribe((contacts) => {
        this.userContacts = contacts;
      });
    switch (+this.selectCtrl.value) {
      case SearchType.User:
        this.dataService
          .getUserWithGames(this.currentUser.id, value)
          .subscribe((data) => {
            this.elements = data;
          });
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

  addContact(id: number) {
    this.dataService.saveContact(this.currentUser.id, id).subscribe(() => {
      this.snackBar.open('Contact has been successfully added.', 'Add', {
        duration: 2500,
      });
      this.reloadData();
    });
  }

  showAddBtn(id: number) {
    return this.userContacts.findIndex((u) => u.id === id) === -1;
  }
}

enum SearchType {
  User = 1,
  Places = 2,
}
