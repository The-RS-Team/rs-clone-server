import { IsInt, IsNotEmpty, IsString, IsUUID, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCardDto {
  @ApiPropertyOptional({ type: String, nullable: false })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly columnId: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @Min(0)
  readonly position: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  @IsString()
  readonly cover: string;

}
