import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { ActivityEntity } from './models/activity';
import { Actions, Tables } from '../../app.constants';

@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>) {
  }

  async save(action: Actions, boardId: string, userId: string, table: Tables, info: string): Promise<ActivityEntity> {
    const activity = new ActivityEntity(action, boardId, userId, table, info);
    return this.activityRepository.save(activity);
  }

  async getAtivityByUser(userId: string): Promise<any[]> {
    return getManager()
      .query('SELECT "activity".*, "users".*, "board".* ' +
        'FROM "activity" LEFT JOIN "users" ON "activity"."userUserId" = "users"."user_id" ' +
        '                LEFT JOIN "board" ON "activity"."boardId" = "board"."id" ' +
        ' WHERE "activity"."userId" = $1 ' +
        ' ORDER BY "activity"."created" DESC', [userId]);
  }

  async getAtivityByBoard(boardId: string): Promise<any[]> {
    return getManager()
      .query('SELECT "activity".*, "users".*, "board".* ' +
        'FROM "activity" LEFT JOIN "users" ON "activity"."userUserId" = "users"."user_id" ' +
        '                LEFT JOIN "board" ON "activity"."boardId" = "board"."id" ' +
        ' WHERE "activity"."boardId" = $1 ' +
        ' ORDER BY "activity"."created" DESC', [boardId]);
  }
}
