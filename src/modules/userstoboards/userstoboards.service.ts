import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { UsersToBoardsEntity } from './models/userstoboards';
import { BoardEntity } from '../board/models/board';

@Injectable()
export class UsersToBoardsService {

  constructor(
    @InjectRepository(UsersToBoardsEntity)
    private readonly usersToBoardsRepository: Repository<UsersToBoardsEntity>) {
  }

  async getBoards(userId: string): Promise<BoardEntity[]> {
    return await getConnection()
      .createQueryBuilder()
      .from(BoardEntity, 'board')
      .leftJoinAndSelect(UsersToBoardsEntity, 'userstoboards')
      .where('userstoboards.userId = :userId', { userId: userId })
      .getMany();
  }

  async create(userId: string, boardId: string, isOwner: boolean): Promise<UsersToBoardsEntity> {
    const usersToBoards = new UsersToBoardsEntity(userId, boardId, isOwner);
    const item = this.usersToBoardsRepository.merge(usersToBoards);
    return this.usersToBoardsRepository.save(item);
  }
}
