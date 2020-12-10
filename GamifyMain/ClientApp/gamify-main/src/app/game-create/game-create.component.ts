import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.scss'],
})
export class GameCreateComponent implements OnInit {
  createdGame = new Game(0, '', '');
  formProps: any;
  placeId: number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.placeId = Number.parseInt(this.activeRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.formProps = { game: this.createdGame, editing: false };
  }

  save() {
    this.dataService.createGame(this.createdGame).subscribe((response) => {
      this.dataService
        .createGameInPlace({
          gameId: response.body.id,
          placeId: this.placeId,
        })
        .subscribe(() =>
          this.router.navigateByUrl('/placeAbout/' + this.placeId)
        );
    });
  }
}
