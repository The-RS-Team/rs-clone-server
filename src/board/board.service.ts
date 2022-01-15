import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Board} from '../models/board.entity';
import {Repository} from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,
    ) {
    }

    async getBoards() {
        return this.boardRepository.find();
    }
}
