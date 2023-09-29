import { Module } from '@nestjs/common';
import { PlayersController } from 'src/controllers/players.controller';
import { PlayersService } from 'src/services/players.service';

@Module({
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
