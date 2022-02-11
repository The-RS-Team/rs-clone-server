import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CardEntity } from './models/card';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardEntity)
    private readonly CardRepository: Repository<CardEntity>) {
  }

  async getCards(): Promise<CardEntity[]> {
    return this.CardRepository.find({ order: { position: 'ASC' } });
  }

  async getCard(id: string): Promise<CardEntity> {
    return this.CardRepository.findOne(id);
  }

  async updateCard(card: UpdateCardDto): Promise<CardEntity> {
    const updateResultNode = await this.CardRepository.update(card.id, card);
    if (updateResultNode.affected > 0) {
      return this.getCard(card.id);
    }
    return new CardEntity();
  }

  async create(card: CreateCardDto): Promise<UpdateCardDto> {
    const item = this.CardRepository.create(card);
    return this.CardRepository.save(item);
  }

  async deleteCard(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.CardRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}

