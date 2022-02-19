import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, getManager, Repository } from 'typeorm';
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

  getItem(id: string): Promise<UsersToBoardsEntity> {
    return this.usersToBoardsRepository.findOne(id);
  }

  getItemByBoard(boardId: string): Promise<UsersToBoardsEntity> {
    return getManager()
      .query('SELECT "userstoboards".*, "users".*, "board".*' +
        ' FROM "userstoboards" LEFT JOIN "users" ON "userstoboards"."userUserId" = "users"."user_id" ' +
        '                      LEFT JOIN "board" ON "userstoboards"."boardId" = "board"."id" ' +
        '  WHERE "userstoboards"."boardId" =  $1 ', [boardId]);
  }

  async deleteItem(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.usersToBoardsRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }

}
