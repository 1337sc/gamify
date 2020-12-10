import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
  styleUrls: ['./game-edit.component.scss'],
})
export class GameEditComponent implements OnInit {
  editedGame: Game;
  editedGameId: number;
  placeId: number;
  formProps: any;
  loaded = false;

  constructor(
    private dataService: DataService,
    private router: Router,
    activeRoute: ActivatedRoute
  ) {
    this.editedGameId = Number.parseInt(activeRoute.snapshot.params['gameId']);
    this.placeId = Number.parseInt(activeRoute.snapshot.params['placeId']);
  }

  ngOnInit(): void {
    this.dataService.getGame(this.editedGameId).subscribe((response) => {
      this.editedGame = response.body;
      this.formProps = { game: this.editedGame, editing: true };
      this.loaded = true;
    });
  }

  save() {
    this.dataService
      .updateGame(this.editedGame)
      .subscribe(() => this.router.navigateByUrl('/placeAbout/' + this.placeId));
  }
}
