import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './controllers/games.controller';
import { PlayersController } from './controllers/players.controller';
import { RoundsController } from './controllers/rounds.controller';
import { GamesService } from './services/games.service';
import { PlayersService } from './services/players.service';
import { RoundsService } from './services/rounds.service';

@Module({
  controllers: [
    AppController,
    PlayersController,
    RoundsController,
    GamesController,
  ],
  providers: [AppService, PlayersService, RoundsService, GamesService],
})
export class AppModule {}
