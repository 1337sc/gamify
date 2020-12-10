import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Game } from '../game';

@Component({
  selector: 'app-wished-game-create',
  templateUrl: './wished-game-create.component.html',
  styleUrls: ['./wished-game-create.component.scss'],
})
export class WishedGameCreateComponent implements OnInit {
  createdGame = new Game(0, '', '');
  formProps: any;
  userId: number;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    this.userId = Number.parseInt(this.activeRoute.snapshot.params['id']);
  }

  ngOnInit(): void {
    this.formProps = { game: this.createdGame, editing: false };
  }

  save() {
    this.dataService.createGame(this.createdGame).subscribe((response) => {
      this.dataService
        .createWishedGame({
          gameId: response.body.id,
          userId: this.userId,
        })
        .subscribe(() =>
          this.router.navigateByUrl('/cabinet')
        );
    });
  }
}
