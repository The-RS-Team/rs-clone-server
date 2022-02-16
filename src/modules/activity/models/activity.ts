import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Actions } from '../../../app.constants';
import { UserEntity } from '../../users/models/users';

@Entity('activity')
export class ActivityEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ enum: ['insert', 'delete', 'update'] })
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Actions, default: Actions.update })
  public action: Actions;

  @CreateDateColumn({ nullable: false })
  created: Date;

  @ManyToOne(() => UserEntity, { cascade: true, onDelete: 'NO ACTION', onUpdate: 'NO ACTION', nullable: false })
  @JoinColumn()
  public user: UserEntity;

  @ApiPropertyOptional({ type: String })
  @Column('text', {})
  public info: string;

  constructor(action: Actions, info: string, user: UserEntity) {
    this.action = action;
    this.info = info;
    this.user = user;
  }
}
