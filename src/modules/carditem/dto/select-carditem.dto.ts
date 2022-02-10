import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SelectCarditemDto {
  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly info: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly cardId: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiPropertyOptional({ type: Date, nullable: false })
  @IsDate()
  readonly created: Date;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  readonly name: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  readonly picture: string;
}
