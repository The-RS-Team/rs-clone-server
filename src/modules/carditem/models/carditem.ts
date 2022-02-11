import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CardEntity } from '../../card/models/card';
import { UserEntity } from '../../users/models/user';

@Entity('carditem')
export class CarditemEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public cardId: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public info: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  userId: string;

  @ApiPropertyOptional({ type: Date, nullable: false })
  @CreateDateColumn({ name: 'created' })
  @IsNotEmpty()
  public created: Date;

  @ApiPropertyOptional({ type: Date, nullable: true })
  @UpdateDateColumn({ name: 'updated' })
  updated: Date;

  @ManyToOne(() => CardEntity, card => card.cardItems, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn()
  public card: CardEntity;
}
