import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CarditemEntity } from './models/carditem';
import { CreateCarditemDto } from './dto/create-cartitem.dto';
import { UpdateCarditemDto } from './dto/update-carditem.dto';

@Injectable()
export class CarditemService {
  constructor(
    @InjectRepository(CarditemEntity)
    private readonly CarditemRepository: Repository<CarditemEntity>) {
  }

  async getCarditems(cardId: string): Promise<CarditemEntity[]> {
    return await this.CarditemRepository
      .createQueryBuilder('carditem')
      .innerJoin('carditem.userId', 'users')
      .select([
        'carditem.id',
        'carditem.info',
        'carditem.userid',
        'carditem.created',
        'users.name',
        'users.picture',
      ])
      .where('carditem.cardId = :cardId', { cardId: cardId })
      .orderBy('carditem.created', 'DESC')
      .getMany();
  }

  async getCarditem(id: string): Promise<CarditemEntity> {
    return this.CarditemRepository.findOne(id);
  }

  async updateCarditem(carditem: UpdateCarditemDto): Promise<UpdateResult> {
    const item = await this.CarditemRepository.preload({
      id: carditem.id,
      ...carditem,
    });
    if (!item) {
      throw new NotFoundException(`Item ${carditem.id} not found`);
    }
    return this.CarditemRepository.update(item.id, item);
  }

  async create(card: CreateCarditemDto): Promise<CarditemEntity> {
    const item = this.CarditemRepository.create(card);
    return this.CarditemRepository.save(item);
  }

  async deleteCarditem(id: string): Promise<DeleteResult> {
    return this.CarditemRepository.delete(id);
  }
}

