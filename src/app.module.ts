import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersController } from './controllers/players.controller';

@Module({
  imports: [],
  controllers: [AppController, PlayersController],
  providers: [AppService],
})
export class AppModule {}
