import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

interface PlayersFindOneParams {
  id: string;
}

class CreatePlayersDto {
  name: string;
}

@Controller('players')
export class PlayersController {
  @Get()
  findAll(): string {
    return 'players';
  }

  @Get(':id')
  findOne(@Param() params: PlayersFindOneParams): string {
    const { id } = params;

    return `player ${id}`;
  }

  @Post()
  create(
    @Body() body: CreatePlayersDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { name } = body;

    res.header({ 'Set-Cookie': `current-player=${name}` });

    return res.send(`player created with name ${name}`);
  }
}
