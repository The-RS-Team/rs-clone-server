import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {BoardEntity} from './models/board';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>) {
    }

    async getBoards(): Promise<BoardEntity[]> {
        return this.boardRepository.find();
    }

    async getBoardsFavorite(): Promise<BoardEntity[]> {
        return this.boardRepository
            .createQueryBuilder('board')
            .where('board.isFavorite=:isFavorite', {isFavorite: true})
            .getMany();
    }

    async getBoard(id: number): Promise<BoardEntity> {
        return this.boardRepository.findOne(id, {relations: ['columns']});
    }

    async updateBoard(board: BoardEntity): Promise<UpdateResult> {
        return this.boardRepository.update(board.id, board);
    }

    async create(board: BoardEntity): Promise<BoardEntity> {
        return this.boardRepository.save(board);
    }

    async deleteBoard(id: number): Promise<DeleteResult> {
        return this.boardRepository.delete(id);
    }
}

