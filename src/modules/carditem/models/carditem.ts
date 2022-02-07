import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CardEntity } from '../../card/models/card';

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
  public userId: string;

  @ApiPropertyOptional({ type: Date, nullable: false })
  @CreateDateColumn({ name: 'created' })
  @IsNotEmpty()
  public created: Date;

  @ManyToOne(() => CardEntity, card => card.cardItems, { onDelete: 'CASCADE', nullable: false })
  public card: CardEntity;
}
