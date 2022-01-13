import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { SocketGateway } from './socket.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, BoardModule],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
