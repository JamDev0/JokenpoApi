import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { Game } from 'src/interfaces/game.interface';
import { GamesService } from 'src/services/games.service';

interface GamesFindOneParams {
  id: string;
}

interface GamesPutNewRoundParams {
  id: string;
}

class PutNewRoundDto {
  @IsString()
  roundId: string;
}

class CreateGameDto {
  @IsNumber()
  bestOf: number;

  @IsArray()
  playersId: string[];
}

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Post()
  create(@Body() body: CreateGameDto): Game {
    const newGame: Game = { ...body, id: randomUUID(), roundsId: [] };

    const createdGame = this.gamesService.create(newGame);

    return createdGame;
  }

  @Put(':id')
  putNewRound(
    @Param() params: GamesPutNewRoundParams,
    @Body() body: PutNewRoundDto,
  ) {
    const { id } = params;

    const { roundId } = body;

    const game = this.gamesService.putNewRound(roundId, id);

    return game;
  }

  @Get()
  findAll(): Game[] {
    const games = this.gamesService.findAll();

    return games;
  }

  @Get(':id')
  findOne(@Param() params: GamesFindOneParams): Game {
    const { id } = params;

    const game = this.gamesService.findOne(id);

    return game;
  }
}
