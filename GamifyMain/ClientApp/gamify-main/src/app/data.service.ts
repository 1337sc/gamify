import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './game';
import { Place } from './place';
import { User } from './user';
import { UserWishedGame } from './uwg'

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersUrl = '/api/users';
  private placesUrl = '/api/places';
  private userWG = 'api/userwishedgames';

  private options = {
    observe: 'response' as const,
  };

  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get<User[]>(this.usersUrl, this.options);
  }

  public getUser(id: number) {
    return this.http.get<User>(`${this.usersUrl}/${id}`, this.options);
  }

  public getUserByEmail(email: string) {
    return this.http.get<User>(
      `${this.usersUrl}/fromemail/${email}`,
      this.options
    );
  }

  public createUser(user: User) {
    console.log(user);
    var response = this.http.post<User>(this.usersUrl, user, this.options);
    response.subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
    return response;
  }

  public updateUser(user: User) {
    return this.http.put<User>(
      `${this.usersUrl}/${user.id}`,
      user,
      this.options
    );
  }

  public deleteUser(id: number) {
    return this.http.delete<User>(`${this.usersUrl}/${id}`, this.options);
  }

  public getPlaces() {
    return this.http.get<Place[]>(this.placesUrl, this.options);
  }

  public getPlace(id: number) {
    return this.http.get<Place>(`${this.placesUrl}/${id}`, this.options);
  }

  public getPlacesByOwnerId(id: number) {
    return this.http.get<Place[]>(
      `${this.placesUrl}/owner/${id}`,
      this.options
    );
  }

  getPlaceGames(id: number) {
    return this.http.get<Game[]>(`${this.placesUrl}/${id}/games`, this.options);
  }

  public getPlacesByName(name: string) {
    return this.http.get<Place[]>(
      `${this.placesUrl}/search/${name}`,
      this.options
    );
  }

  public getPlacesInRadius(radius: number, userLat: number, userLong: number) {
    return this.http.get<Place[]>(
      `${this.placesUrl}/radius/${radius},${userLat},${userLong}`,
      this.options
    );
  }

  public createPlace(place: Place) {
    return this.http.post<Place>(this.placesUrl, place, this.options);
  }

  public updatePlace(place: Place) {
    return this.http.put<Place>(
      `${this.placesUrl}/${place.id}`,
      place,
      this.options
    );
  }

  public deletePlace(id: number) {
    return this.http.delete<Place>(`${this.placesUrl}/${id}`, this.options);
  }

  createUserWishedGame(uwg: UserWishedGame){
    return this.http.post<UserWishedGame>(this.usersUrl, uwg, this.options)
  }
}
