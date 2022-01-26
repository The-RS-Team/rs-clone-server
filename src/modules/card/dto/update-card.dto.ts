import {IsInt, IsNotEmpty, IsString, Min} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class UpdateCardDto {
    @ApiPropertyOptional({type: Number, nullable: false})
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    readonly id: number;

    @ApiPropertyOptional({type: Number, nullable: false})
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    readonly columnId: number;

    @ApiPropertyOptional({type: String, nullable: false})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiPropertyOptional({type: Number})
    @IsInt()
    @Min(0)
    readonly position: number;
}
