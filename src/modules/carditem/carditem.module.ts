import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarditemEntity } from './models/carditem';
import { CarditemService } from './carditem.service';
import { UserEntity } from '../users/models/users';


@Module({
  imports: [
    TypeOrmModule.forFeature([CarditemEntity, UserEntity]),
  ],
  providers: [CarditemService],
  exports: [CarditemService],
})

export class CarditemModule {
}
