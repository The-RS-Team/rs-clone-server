import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getConnection, getManager, Repository } from 'typeorm';
import { CarditemEntity } from './models/carditem';
import { CreateCarditemDto } from './dto/create-carditem.dto';
import { UpdateCarditemDto } from './dto/update-carditem.dto';
import { UserEntity } from '../users/models/user';
import { SelectCarditemDto } from './dto/select-carditem.dto';

@Injectable()
export class CarditemService {
  constructor(
    @InjectRepository(CarditemEntity)
    private readonly CarditemRepository: Repository<CarditemEntity>) {
  }

  async getCarditems(cardId: string): Promise<SelectCarditemDto[]> {
    return await getManager()
      .query('SELECT "carditem".*, "users".* ' +
        'FROM "carditem" LEFT JOIN "users" ON "carditem"."userId" = "users"."user_id" ' +
        'WHERE "carditem"."cardId" = $1 ' +
        'ORDER BY "carditem"."created" DESC', [cardId]);
  }

  async getCarditem(id: string): Promise<CarditemEntity> {
    return this.CarditemRepository.findOne(id);
  }

  async updateCarditem(carditem: UpdateCarditemDto): Promise<CarditemEntity> {
    const item = await this.CarditemRepository.preload({
      id: carditem.id, ...carditem,
    });
    if (!item) {
      throw new NotFoundException(`Item ${carditem.id} not found`);
    }
    const updateResultNode = await this.CarditemRepository.update(item.id, item);
    if (updateResultNode.affected > 0) {
      return item;
    }
    return new CarditemEntity();
  }

  async create(card: CreateCarditemDto): Promise<CarditemEntity> {
    const item = this.CarditemRepository.create(card);
    return this.CarditemRepository.save(item);
  }

  async deleteCarditem(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.CarditemRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}

