import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './models/board';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {

  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {
  }

  async getBoards(userId: string): Promise<BoardEntity[]> {
    return await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.usersToBoards', 'userstoboards')
      .where('userstoboards.userUserId = :userId', { userId: userId })
      .getMany();
  }

  async getBoardsFavorite(userId: string): Promise<BoardEntity[]> {
    return await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.usersToBoards', 'userstoboards')
      .where('userstoboards.userUserId = :userId', { userId: userId })
      .andWhere('board.isFavorite=:isFavorite', { isFavorite: true })
      .getMany();
  }

  async getBoard(id: string): Promise<BoardEntity> {
    return await this.boardRepository.findOneOrFail(id, { relations: ['columns'] });
  }

  async updateBoard(board: UpdateBoardDto): Promise<UpdateResult> {
    const item = await this.boardRepository.findOne(board.id);
    if (!item) {
      throw new NotFoundException(`Item ${board.id} not found`);
    }
    Object.assign(item, board);
    if (item.usersToBoards)
      delete item.usersToBoards;
    return await this.boardRepository.update(item.id, item);
  }

  async create(board: CreateBoardDto): Promise<BoardEntity> {
    const item = this.boardRepository.create(board);
    return await this.boardRepository.save(item);
  }

  async deleteBoard(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.boardRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}


