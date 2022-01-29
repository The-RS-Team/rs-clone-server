import configService from '../db-config';
import {AuthModule} from './auth/auth.module';
import {BoardModule} from './modules/board/board.module';
import {ColumnModule} from './modules/column/column.module';
import {Module} from '@nestjs/common';
import {SocketGateway} from './socket.gateway';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersController} from './modules/users/users.controller';
import {CardModule} from './modules/card/card.module';
import {UsersModule} from './modules/users/users.module';
import {AuthController} from './auth/auth.controller';

@Module({
    imports: [
        // AuthModule,
        BoardModule,
        ColumnModule,
        CardModule,
        UsersModule,
        TypeOrmModule.forRoot(configService.createTypeOrmProdConfig()),
    ],
    controllers: [
        UsersController,
        // AuthController,
    ],
    providers: [
        SocketGateway,
    ],
})

export class AppModule {
}
