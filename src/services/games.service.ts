import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { frasalArrayListing } from 'src/helpers/frasalArrayListing';
import { isDuplicated } from 'src/helpers/isDuplicated';
import { Game } from 'src/interfaces/game.interface';
import { PlayersService } from './players.service';
import { RoundsService } from './rounds.service';

class Entity extends Array {
  private onPush;

  constructor(
    onPush?: (pushedItems: any[], previewsArrayState: any[]) => void,
  ) {
    super();
    this.onPush = onPush;
  }

  push(...args) {
    this.onPush(args, this);
    return super.push(...args);
  }
}

function validateNewGameEntity(pushedGames: Game[], games: Game[]) {
  pushedGames.forEach((game) => {
    const isGameDuplicated = isDuplicated<Game>(games, { id: game.id });

    if (isGameDuplicated)
      throw new HttpException(
        `${frasalArrayListing(isGameDuplicated)} are/is not unique!`,
        HttpStatus.BAD_REQUEST,
      );

    const innerDuplicatedRound = game.roundsId.find((roundId, index, array) =>
      array.find((item) => item === roundId),
    );

    if (innerDuplicatedRound.length > 0)
      throw new HttpException(
        `Round of id ${innerDuplicatedRound} is already attributed to the game ${game.id}!`,
        HttpStatus.BAD_REQUEST,
      );

    const duplicatedRound = game.roundsId.find((roundId) =>
      games.find((innerGame) =>
        innerGame.roundsId.find((item) => item === roundId),
      ),
    );

    if (duplicatedRound)
      throw new HttpException(
        `Round of id ${duplicatedRound} is/are already attributed to the game ${game.id}!`,
        HttpStatus.BAD_REQUEST,
      );
  });
}

@Injectable()
export class GamesService {
  constructor(
    private roundsService: RoundsService,
    private playersService: PlayersService,
  ) {}

  private readonly games: Game[] = new Entity(validateNewGameEntity);

  create(game: Game) {
    game.roundsId.forEach((roundId) => this.roundsService.findOne(roundId));

    game.playersId.forEach((playerId) => this.playersService.findOne(playerId));

    this.games.push(game);

    return game;
  }

  putNewRound(roundId: string, gameId: string) {
    this.roundsService.findOne(roundId);

    const gameIndex = this.games.findIndex((game) => game.id === gameId);

    const game = this.games[gameIndex];

    if (!game)
      throw new HttpException(
        `Game of id ${gameId} does not exists!`,
        HttpStatus.BAD_REQUEST,
      );

    this.games.splice(gameIndex, 1);

    game.roundsId.push(roundId);

    this.games.push(game);

    return game;
  }

  findOne(gameId: string) {
    const game = this.games.find(({ id }) => id === gameId);

    if (!game)
      throw new HttpException(
        `No game found with id of ${gameId}!`,
        HttpStatus.BAD_REQUEST,
      );

    return game;
  }

  findAll() {
    const games = this.games;

    return games;
  }
}
