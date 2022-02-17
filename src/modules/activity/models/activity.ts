import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Actions, Tables } from '../../../app.constants';

@Entity('activity')
export class ActivityEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiProperty({ enum: ['insert', 'delete', 'update'] })
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Actions, default: Actions.update })
  public action: Actions;

  @ApiProperty({ enum: ['board', 'card', 'cardItem', 'column', 'file'] })
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Tables })
  public table: Tables;

  @CreateDateColumn({ nullable: false })
  public created: Date;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('text', { nullable: false })
  public userId: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('uuid', { nullable: true })
  public boardId: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Column('text', { nullable: true })
  public info: string;

  constructor(action: Actions, boardId: string, userId: string, table: Tables, info: string) {
    this.action = action;
    this.info = info;
    this.userId = userId;
    this.boardId = boardId;
    this.table = table;
  }
}
