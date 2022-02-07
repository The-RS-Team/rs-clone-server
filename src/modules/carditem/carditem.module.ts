import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarditemEntity } from './models/carditem';
import { CarditemService } from './carditem.service';


@Module({
  imports: [TypeOrmModule.forFeature([CarditemEntity])],
  providers: [CarditemService],
  exports: [CarditemService],
})

export class CarditemModule {
}
