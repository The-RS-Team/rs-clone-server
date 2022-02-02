import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiPropertyOptional({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  readonly isFavorite: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  readonly background: string;
}
