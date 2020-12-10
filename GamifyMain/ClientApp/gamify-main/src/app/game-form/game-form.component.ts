import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { DataService } from '../data.service';
import { Game } from '../game';
import { Genre } from '../genre';

@Component({
  selector: 'app-game-form',
  templateUrl: './game-form.component.html',
  styleUrls: ['./game-form.component.scss'],
})
export class GameFormComponent implements OnInit {
  @Input() props: { game: Game; editing: boolean };
  gameGenres: Genre[];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (this.props.editing) {
      this.dataService
        .getGameGenres(this.props.game.id)
        .subscribe((response) => {
          this.gameGenres = response.body;
        });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.dataService
        .createGenre(new Genre(0, value))
        .subscribe((response) => {
          this.dataService.createGameGenre({
            gameId: this.props.game.id,
            genreId: response.body.id,
          });
          
        });
    }

    if (input) {
      input.value = '';
    }
  }

  remove(genre: Genre): void {
    this.dataService.deleteGenre(genre.id);
  }
}
