import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CardEntity} from './models/card';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly CardRepository: Repository<CardEntity>) {
    }

    async getCards(): Promise<CardEntity[]> {
        return this.CardRepository.find();
    }

    async getCard(id: number): Promise<CardEntity> {
        return this.CardRepository.findOne(id);
    }

    async updateCard(card: CardEntity): Promise<UpdateResult> {
        return this.CardRepository.update(card.id, card);
    }

    async create(card: CardEntity): Promise<CardEntity> {
        return this.CardRepository.save(card);
    }

    async deleteCard(id: number): Promise<DeleteResult> {
        return this.CardRepository.delete(id);
    }
}

