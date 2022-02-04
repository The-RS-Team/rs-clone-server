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
  @Column('text', {})
  public picture: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', {})
  public iss: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', {})
  public aud: string;
}

