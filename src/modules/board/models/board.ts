import {
  AfterInsert,
  AfterRemove,
  BaseEntity,
  Column,
  Entity,
  InsertEvent,
  OneToMany,
  PrimaryGeneratedColumn,
  RemoveEvent,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ColumnEntity } from '../../column/models/column';
import { UsersToBoardsEntity } from '../../userstoboards/models/userstoboards';
import { CurrentUser } from '../../../utils/decorators/user.decorator';
import { UserEntity } from '../../users/models/users';
import { Actions } from '../../../app.constants';
import { ActivityService } from '../../activity/activity.service';

@Entity('board')
export class BoardEntity extends BaseEntity {

  constructor(private readonly activityService: ActivityService) {
    super();
  }

  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public title: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  public description: string;

  @ApiPropertyOptional({ type: Boolean })
  @Column('boolean', {})
  public isFavorite: boolean;

  @ApiPropertyOptional({ type: String })
  @Column('text', {})
  public background: string;

  @OneToMany(() => ColumnEntity, column => column.board)
  public columns: ColumnEntity[];

  @OneToMany(() => UsersToBoardsEntity, usersToBoardsEntity => usersToBoardsEntity.board)
  public usersToBoards: UsersToBoardsEntity[];

  @AfterInsert()
  async afterInsert(event: InsertEvent<BoardEntity>,
                    @CurrentUser() user: UserEntity) {
    console.log('AfterInsert BoardEntity');
    this.activityService.create(Actions.insert, this.title, user);
  }

  @AfterRemove()
  async afterRemove(event: RemoveEvent<BoardEntity>,
                    @CurrentUser() user: UserEntity) {
    this.activityService.create(Actions.delete, this.title, user);
  }
}
