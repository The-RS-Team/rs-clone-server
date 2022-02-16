import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './models/activity';
import { ActivityService } from './activity.service';


@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity])],
  providers: [ActivityService],
  exports: [ActivityService],
})
export class ActivityModule {
}

