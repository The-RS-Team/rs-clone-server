import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersToBoardsEntity } from './models/userstoboards';
import { UsersToBoardsService } from './userstoboards.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersToBoardsEntity])],
  providers: [UsersToBoardsService],
  exports: [UsersToBoardsService],
})
export class UsersToBoardsModule {
}


