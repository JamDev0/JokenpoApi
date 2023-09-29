import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Player } from 'src/interfaces/player.interface';

@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];

  create(player: Player) {
    const isUnique =
      !this.players.find((val) => val.name === player.name) &&
      !this.players.find((val) => val.id === player.id);

    if (!isUnique)
      throw new HttpException(
        `There is already an user with name ${player.name}`,
        HttpStatus.BAD_REQUEST,
      );

    this.players.push(player);

    return player;
  }

  findAll() {
    return this.players;
  }

  findOne(id: string) {
    const player = this.players.find((val) => val.id === id);

    if (!player)
      throw new HttpException(
        `No user found with id of ${id}`,
        HttpStatus.BAD_REQUEST,
      );

    return player;
  }
}
