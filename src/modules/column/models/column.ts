import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { BoardEntity } from '../../board/models/board';
import { CardEntity } from '../../card/models/card';

@Entity('column', { orderBy: { position: 'ASC' } })
export class ColumnEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public boardId: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public title: string;

  @ApiPropertyOptional({ type: Number })
  @Column('integer', { nullable: false })
  @IsNotEmpty()
  public position: number;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  public description: string;

  @ManyToOne(() => BoardEntity, board => board.columns, { onDelete: 'CASCADE', nullable: false })
  public board: BoardEntity;

  @OneToMany(() => CardEntity, card => card.column, { eager: true })
  public cards: CardEntity[];
}
