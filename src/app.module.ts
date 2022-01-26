import configService from '../db-config';
import {AuthModule} from './auth/auth.module';
import {BoardModule} from './modules/board/board.module';
import {ColumnModule} from './modules/column/column.module';
import {Module} from '@nestjs/common';
import {SocketGateway} from './socket.gateway';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersController} from './modules/users/users.controller';
import {CardModule} from './modules/card/card.module';

@Module({
    imports: [
        AuthModule,
        BoardModule,
        ColumnModule,
        CardModule,
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
