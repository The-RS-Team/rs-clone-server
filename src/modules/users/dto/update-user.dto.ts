import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column, PrimaryColumn } from 'typeorm';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  public user_id: string;

  @ApiPropertyOptional({ type: String })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  readonly email: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  readonly name: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  public nickname: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { default: 'en' })
  public lang: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', { nullable: true })
  readonly picture: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', {})
  readonly iss: string;

  @ApiPropertyOptional({ type: String })
  @Column('text', {})
  readonly aud: string;
}


