import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from './game';
import { Genre } from './genre';
import { Place } from './place';
import { User } from './user';
import { Comment } from './comment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private usersUrl = '/api/users';
  private placesUrl = '/api/places';
  private gamesUrl = '/api/games';
  private genresUrl = '/api/genres';
  private gamesInPlacesUrl = '/api/gamesInPlaces';
  private gamesOfGenresUrl = 'api/gamesOfGenres';
  private usersWishedGamesUrl = '/api/usersWishedGames';
  private commentsUrl = '/api/comments';

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

  getUserWishlist(id: number) {
    return this.http.get<Game[]>(`${this.usersUrl}/${id}/games`, this.options);
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

  public getPlaceComments(id: number) {
    return this.http.get<Comment[]>(
      `${this.placesUrl}/${id}/comments`,
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

  public getGames() {
    return this.http.get<Game[]>(`${this.gamesUrl}`, this.options);
  }

  public getGame(id: number) {
    return this.http.get<Game>(`${this.gamesUrl}/${id}`, this.options);
  }

  public getGameGenres(id: number) {
    return this.http.get<Genre[]>(
      `${this.gamesUrl}/${id}/genres`,
      this.options
    );
  }

  public createGame(game: Game) {
    return this.http.post<Game>(`${this.gamesUrl}`, game, this.options);
  }

  public updateGame(game: Game) {
    return this.http.put<Game>(
      `${this.gamesUrl}/${game.id}`,
      game,
      this.options
    );
  }

  public deleteGame(id: number) {
    return this.http.delete<Game>(`${this.gamesUrl}/${id}`, this.options);
  }

  public createGameInPlace(gameInPlace: { gameId: number; placeId: number }) {
    return this.http.post<{ gameId: number; placeId: number }>(
      this.gamesInPlacesUrl,
      gameInPlace,
      this.options
    );
  }

  public deleteGameInPlace(id: number) {
    return this.http.delete<{ gameId: number; placeId: number }>(
      `${this.gamesInPlacesUrl}/${id}`,
      this.options
    );
  }

  public getGenre(id: number) {
    return this.http.get<Genre>(`${this.genresUrl}/${id}`, this.options);
  }

  public createGenre(genre: Genre) {
    return this.http.post<Genre>(this.genresUrl, genre, this.options);
  }

  public deleteGenre(id: number) {
    return this.http.delete<Genre>(`${this.genresUrl}/${id}`, this.options);
  }

  public createGameGenre(gameOfGenre: { gameId: number; genreId: number }) {
    return this.http.post<{ gameId: number; genreId: number }>(
      this.gamesOfGenresUrl,
      gameOfGenre,
      this.options
    );
  }

  createWishedGame(wishedGame: { gameId: number; userId: number }) {
    return this.http.post(this.usersWishedGamesUrl, wishedGame, this.options);
  }

  createComment(comment: Comment) {
    return this.http.post<Comment>(this.commentsUrl, comment, this.options);
  }

  createCommentForPlace(commentId: number, placeId: number){
    return this.http.post("api/commentsforplaces", {placeId: placeId, commentId: commentId}, this.options);
  }
}
