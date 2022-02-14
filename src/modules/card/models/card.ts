import { AfterLoad, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ColumnEntity } from '../../column/models/column';
import { FileEntity } from '../../files/models/files';
import { CarditemEntity } from '../../carditem/models/carditem';
import { Exclude } from 'class-transformer';

@Entity('card')
export class CardEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public columnId: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public title: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @Column('varchar', { nullable: true })
  @IsNotEmpty()
  public description: string;

  @ApiPropertyOptional({ type: Number, nullable: false })
  @Column('integer', { nullable: false })
  @IsNotEmpty()
  public position: number;

  @ManyToOne(() => ColumnEntity, column => column.cards, { onDelete: 'CASCADE', nullable: false })
  @Exclude({ toPlainOnly: true })
  public column: ColumnEntity;

  @OneToMany(() => FileEntity, file => file.card, { eager: true })
  public files: FileEntity[];

  @OneToMany(() => CarditemEntity, cardItems => cardItems.card, { eager: true })
  public cardItems: CarditemEntity[];

  @AfterLoad()
  getCardItemsCount() {
    this.cardItemsCount = this.cardItems.length;
  }
  public cardItemsCount: number;

  @AfterLoad()
  getFilesCount() {
    this.filesCount = this.files.length;
  }
  public filesCount: number;
}
