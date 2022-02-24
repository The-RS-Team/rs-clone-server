import { IsNotEmpty, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarditemDto {
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
}
