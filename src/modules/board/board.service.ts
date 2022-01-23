import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Board} from './models/board';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>) {
    }

    async getBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getBoardsFavorite(): Promise<Board[]> {
        return this.boardRepository
            .createQueryBuilder('board')
            .where('board.isFavorite=:isFavorite', {isFavorite: true})
            .getMany();
    }

    async getBoard(id: number): Promise<Board> {
        return this.boardRepository.findOne(id);
    }

    async updateBoard(board: Board): Promise<UpdateResult> {
        return this.boardRepository.update(board.id, board);
    }

    async create(board: Board): Promise<Board> {
        this.boardRepository.save(board);
        return board;
    }

    async deleteBoard(id: number): Promise<DeleteResult> {
        return this.boardRepository.delete(id);
    }
}

