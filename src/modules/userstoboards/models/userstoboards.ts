import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('userstoboards')
export class UsersToBoardsEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column()
  @IsNotEmpty()
  public userId: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column()
  @IsNotEmpty()
  public boardId: string;

  @ApiPropertyOptional({ type: String })
  @Column('boolean', { nullable: true })
  public isOwner: boolean;

  constructor(userId: string, boardId: string, isOwner: boolean) {
    this.userId = userId;
    this.boardId = boardId;
    this.isOwner = isOwner;
  }
}
