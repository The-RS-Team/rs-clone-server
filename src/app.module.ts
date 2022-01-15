import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BoardModule} from './board/board.module';
import {SocketGateway} from './socket.gateway';
import configService from '../db-config';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.createTypeOrmProdConfig()),
        AuthModule,
        BoardModule,
    ],
    controllers: [],
    providers: [SocketGateway],
})

export class AppModule {
}
