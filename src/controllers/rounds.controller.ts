import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { Round } from 'src/interfaces/round.interface';
import { RoundsService } from 'src/services/rounds.service';

class CreateRoundDto {
  @IsString()
  winnerId: string;
  @IsString()
  gameId: string;
}

interface RoundsFindOneParams {
  id: string;
}

@Controller('rounds')
export class RoundsController {
  constructor(private roundsService: RoundsService) {}

  @Post()
  create(@Body() body: CreateRoundDto): Round {
    const round = { ...body, id: randomUUID() };

    const createdRound = this.roundsService.create(round);

    return createdRound;
  }

  @Get(':id')
  findOne(@Param() params: RoundsFindOneParams): Round {
    const { id } = params;

    const round = this.roundsService.findOne(id);

    return round;
  }
}
