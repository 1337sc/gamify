import { Game } from '../game';

export class UserGames {
  constructor(
    public userId?: number,
    public name?: string,
    public email?: string,
    public games?: Game[]
  ) {}
}
