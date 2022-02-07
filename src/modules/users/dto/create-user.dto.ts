import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateUserDto {
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
  @Column('text', {})
  readonly picture: string;
}
