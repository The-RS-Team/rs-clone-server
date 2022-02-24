import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardEntity } from './models/card';
import { CardService } from './card.service';


@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [CardService],
  exports: [CardService],
})

export class CardModule {
}
