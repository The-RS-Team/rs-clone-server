import configService from '../db-config';
import { BoardModule } from './modules/board/board.module';
import { ColumnModule } from './modules/column/column.module';
import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './modules/users/users.controller';
import { CardModule } from './modules/card/card.module';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { AuthModule } from './auth/auth.module';
import { CarditemModule } from './modules/carditem/carditem.module';
import { UsersToBoardsModule } from './modules/userstoboards/userstoboards.module';
import { ActivityModule } from './modules/activity/activity.module';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    BoardModule,
    ColumnModule,
    CardModule,
    CarditemModule,
    UsersToBoardsModule,
    UsersModule,
    ActivityModule,
    TypeOrmModule.forRoot(configService.createTypeOrmProdConfig()),
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    SocketGateway,
  ],
})

export class AppModule {
}
