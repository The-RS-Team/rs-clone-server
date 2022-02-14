import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserEntity } from '../../users/models/users';
import { BoardEntity } from '../../board/models/board';

@Entity('userstoboards')
export class UsersToBoardsEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: Boolean })
  @Column('boolean', { nullable: true })
  public isOwner: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @Column('boolean', { nullable: true })
  public isFavorite: boolean;

  @ManyToOne(() => UserEntity, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  @JoinColumn()
  public user: UserEntity;

  @ManyToOne(() => BoardEntity, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE', nullable: false })
  @JoinColumn()
  public board: BoardEntity;

  constructor(user: UserEntity, board: BoardEntity, isOwner: boolean) {
    this.user = user;
    this.board = board;
    this.isOwner = isOwner;
  }
}
