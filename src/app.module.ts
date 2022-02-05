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

@Module({
  imports: [
    AuthModule,
    FilesModule,
    BoardModule,
    ColumnModule,
    CardModule,
    UsersModule,
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
