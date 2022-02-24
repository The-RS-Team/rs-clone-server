import { Column, Entity, PrimaryColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('users')
export class UserEntity {
  @ApiPropertyOptional({ type: String, nullable: false })
  @PrimaryColumn()
  @IsNotEmpty()
  public user_id: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public email: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  public name: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  public nickname: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { default: 'en' })
  public lang: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  public picture: string;
}

export interface UserInterface {
  userId: string;
  id: string;
}
