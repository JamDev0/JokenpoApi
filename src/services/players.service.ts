import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { frasalArrayListing } from 'src/helpers/frasalArrayListing';
import { isDuplicated } from 'src/helpers/isDuplicated';
import { Player } from 'src/interfaces/player.interface';

@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];

  create(player: Player) {
    const isPlayerDuplicated = isDuplicated<Player>(this.players, player);

    if (isPlayerDuplicated)
      throw new HttpException(
        `${frasalArrayListing(isPlayerDuplicated)} are/is not unique!`,
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
