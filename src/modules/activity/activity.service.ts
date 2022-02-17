import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/models/users';
import { ActivityEntity } from './models/activity';
import { Actions, Tables } from '../../app.constants';
import { CurrentUser } from '../../utils/decorators/user.decorator';

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
}
