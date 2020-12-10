import { Component, OnInit } from '@angular/core';
import { Game } from '../game';

@Component({
  selector: 'app-wished-game-edit',
  templateUrl: './wished-game-edit.component.html',
  styleUrls: ['./wished-game-edit.component.scss']
})
export class WishedGameEditComponent implements OnInit {
  formProps: { game: Game; editing: boolean };
  
  constructor() { }

  ngOnInit(): void {
  }

}
