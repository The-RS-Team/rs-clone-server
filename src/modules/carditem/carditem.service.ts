import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, Repository } from 'typeorm';
import { CarditemEntity } from './models/carditem';
import { CreateCarditemDto } from './dto/create-carditem.dto';
import { UpdateCarditemDto } from './dto/update-carditem.dto';
import { SelectCarditemDto } from './dto/select-carditem.dto';
import { UserEntity } from '../users/models/users';

@Injectable()
export class CarditemService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(CarditemEntity)
    private readonly CarditemRepository: Repository<CarditemEntity>,
  ) {
  }

  async getCarditems(cardId: string): Promise<SelectCarditemDto[]> {
    return await getManager()
      .query('SELECT "carditem".*, "users".* ' +
        'FROM "carditem" LEFT JOIN "users" ON "carditem"."userId" = "users"."user_id" ' +
        'WHERE "carditem"."cardId" = $1 ' +
        'ORDER BY "carditem"."created" DESC', [cardId]);
  }

  async getCarditem(id: string): Promise<CarditemEntity> {
    return await this.CarditemRepository.findOneOrFail(id);
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

  async create(card: CreateCarditemDto): Promise<SelectCarditemDto> {
    const item = this.CarditemRepository.create(card);
    const carditemEntity = await this.CarditemRepository.save(item);
    const user = await this.usersRepository.findOne(item.userId);
    return Object.assign({}, carditemEntity, user);
  }

  async deleteCarditem(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.CarditemRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}

