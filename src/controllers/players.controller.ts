import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { randomUUID } from 'node:crypto';
import { Player } from 'src/interfaces/player.interface';
import { PlayersService } from 'src/services/players.service';

interface PlayersFindOneParams {
  id: string;
}

class CreatePlayersDto {
  @IsString()
  name: string;
}

@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  findAll(): Player[] {
    const players = this.playersService.findAll();

    return players;
  }

  @Get(':id')
  findOne(@Param() params: PlayersFindOneParams): Player {
    const { id } = params;

    const player = this.playersService.findOne(id);

    return player;
  }

  @Post()
  create(@Body() body: CreatePlayersDto) {
    const { name } = body;

    const player = { name, id: randomUUID() };

    const newPlayer = this.playersService.create(player);

    return newPlayer;
  }
}
