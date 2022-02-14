import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersToBoardsEntity } from './models/userstoboards';
import { BoardEntity } from '../board/models/board';
import { UserEntity } from '../users/models/users';

@Injectable()
export class UsersToBoardsService {

  constructor(
    @InjectRepository(UsersToBoardsEntity)
    private readonly usersToBoardsRepository: Repository<UsersToBoardsEntity>) {
  }

  async create(user: UserEntity, board: BoardEntity, isOwner: boolean): Promise<UsersToBoardsEntity> {
    const usersToBoards = new UsersToBoardsEntity(user, board, isOwner);
    const item = this.usersToBoardsRepository.merge(usersToBoards);
    return this.usersToBoardsRepository.save(item);
  }
}
