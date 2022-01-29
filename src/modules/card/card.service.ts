import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CardEntity} from './models/card';
import {CreateCardDto} from './dto/create-card.dto';
import {UpdateCardDto} from './dto/update-card.dto';

@Injectable()
export class CardService {
    constructor(
        @InjectRepository(CardEntity)
        private readonly CardRepository: Repository<CardEntity>) {
    }

    async getCards(): Promise<CardEntity[]> {
        return this.CardRepository.find();
    }

    async getCard(id: string): Promise<CardEntity> {
        return this.CardRepository.findOne(id);
    }

    async updateCard(card: UpdateCardDto): Promise<UpdateResult> {
        const item = await this.CardRepository.preload({
            id: card.id,
            ...card,
        });
        if (!item) {
            throw new NotFoundException(`Item ${card.id} not found`);
        }
        return this.CardRepository.update(item.id, item);
    }

    async create(card: CreateCardDto): Promise<CardEntity> {
        const item = this.CardRepository.create(card);
        return this.CardRepository.save(item);
    }

    async deleteCard(id: string): Promise<DeleteResult> {
        return this.CardRepository.delete(id);
    }
}

