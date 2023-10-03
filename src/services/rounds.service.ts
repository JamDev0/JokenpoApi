import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { frasalArrayListing } from 'src/helpers/frasalArrayListing';
import { isDuplicated } from 'src/helpers/isDuplicated';
import { Round } from 'src/interfaces/round.interface';
import { Entity } from 'src/utils/entity';

function validateNewRoundEntity(pushedGames: Round[], rounds: Round[]) {
  pushedGames.forEach((round) => {
    const isRoundDuplicated = isDuplicated<Round>(rounds, { id: round.id });

    if (isRoundDuplicated)
      throw new HttpException(
        `${frasalArrayListing(isRoundDuplicated)} are/is not unique!`,
        HttpStatus.BAD_REQUEST,
      );
  });
}

@Injectable()
export class RoundsService {
  private readonly rounds: Round[] = new Entity(validateNewRoundEntity);

  create(round: Round) {
    const isRoundDuplicated = isDuplicated<Round>(this.rounds, {
      id: round.id,
    });

    if (isRoundDuplicated)
      throw new HttpException(
        `${frasalArrayListing(isRoundDuplicated)} are/is not unique!`,
        HttpStatus.BAD_REQUEST,
      );

    this.rounds.push(round);

    return round;
  }

  findMany(gameId: string) {
    const rounds = this.rounds.filter((round) => round.gameId === gameId);

    if (rounds.length === 0)
      throw new HttpException(
        `No round found with gameId of ${gameId}!`,
        HttpStatus.BAD_REQUEST,
      );

    return rounds;
  }

  findOne(roundId: string) {
    const round = this.rounds.find(({ id }) => id === roundId);

    if (!round)
      throw new HttpException(
        `No round found with id of ${roundId}!`,
        HttpStatus.BAD_REQUEST,
      );

    return round;
  }
}
