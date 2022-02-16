import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/models/users';
import { ActivityEntity } from './models/activity';
import { Actions } from '../../app.constants';

@Injectable()
export class ActivityService {

  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>) {
  }

  async create(action: Actions, info: string, user: UserEntity): Promise<ActivityEntity> {
    const activity = new ActivityEntity(action, info, user);
    return this.activityRepository.save(activity);
  }
}
