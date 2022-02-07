import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCarditemDto {
  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly info: string;
}
