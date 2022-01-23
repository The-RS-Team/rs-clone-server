import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BoardModule} from './modules/board/board.module';
import {SocketGateway} from './socket.gateway';
import {UsersController} from './modules/users/users.controller';
import {UsersModule} from './modules/users/users.module';
import configService from '../db-config';
import {ColumnsModule} from './modules/columns/columns.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.createTypeOrmProdConfig()),
        AuthModule,
        BoardModule,
        ColumnsModule,
        UsersModule,
    ],
    controllers: [UsersController],
    providers: [SocketGateway],
})

export class AppModule {
}
