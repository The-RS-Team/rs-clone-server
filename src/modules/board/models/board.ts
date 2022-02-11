import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ColumnEntity } from '../../column/models/column';

@Entity('board')
export class BoardEntity {
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
  @JoinColumn()
  public columns: ColumnEntity[];
}
