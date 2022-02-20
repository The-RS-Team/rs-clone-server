import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteService } from './invite.service';
import { InviteEntity } from './models/invite';
import { UsersModule } from '../users/users.module';
import { UsersToBoardsModule } from '../userstoboards/userstoboards.module';
import { BoardModule } from '../board/board.module';
import { InviteController } from './invite.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([InviteEntity]),
    UsersModule,
    UsersToBoardsModule,
    BoardModule,
  ],
  controllers: [InviteController],
  providers: [InviteService],
  exports: [InviteService],
})

export class InviteModule {
}
