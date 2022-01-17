import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BoardModule} from './board/board.module';
import {SocketGateway} from './socket.gateway';
import {UsersController} from './users/users.controller';
import {UsersModule} from './users/users.module';
import configService from '../db-config';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.createTypeOrmProdConfig()),
        AuthModule,
        BoardModule,
        UsersModule,
    ],
    controllers: [UsersController],
    providers: [SocketGateway],
})

export class AppModule {
}
