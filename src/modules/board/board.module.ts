import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './models/board';
import { UsersToBoardsModule } from '../userstoboards/userstoboards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    UsersToBoardsModule,
  ],
  controllers: [BoardController],
  providers: [
    BoardService,
  ],
})

export class BoardModule {
}
