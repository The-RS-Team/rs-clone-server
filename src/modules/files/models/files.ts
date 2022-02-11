import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CardEntity } from '../../card/models/card';

@Entity('file')
export class FileEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => CardEntity, card => card.files, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  public card: CardEntity;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public cardId: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public originalname: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public encoding: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public mimetype: string;

  @ApiPropertyOptional({ type: Number, nullable: false })
  @Column('integer', { nullable: false })
  @IsNotEmpty()
  public size: number;

  @ApiPropertyOptional({ type: 'bytea' })
  @Column('bytea', {})
  public buffer: Buffer;
}
