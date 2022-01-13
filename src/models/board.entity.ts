import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    nullable: false,
  })
  @IsNotEmpty()
  title: string;

  @Column('text', {})
  description: string;
}
