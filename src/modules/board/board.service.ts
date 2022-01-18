import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Board} from './models/board.entity';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board)
        private readonly boardRepository: Repository<Board>,) {
    }

    async getBoards(): Promise<Board[]> {
        return this.boardRepository.find();
    }

    async getBoard(id: string): Promise<Board> {
        return this.boardRepository.findOne(id);
    }

    async updateBoard(id: string, board: Board): Promise<UpdateResult> {
        return this.boardRepository.update(id, board);
    }

    async create(board: Board): Promise<Board> {
        this.boardRepository.create(board);
        return board;
    }

    async deleteBoard(id: string): Promise<DeleteResult> {
        return this.boardRepository.delete(id);
    }
}