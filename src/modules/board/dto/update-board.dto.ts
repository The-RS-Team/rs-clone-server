import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class UpdateBoardDto {
    @ApiPropertyOptional({type: Number, nullable: false})
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    readonly id: number;

    @ApiPropertyOptional({type: String, nullable: false})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiPropertyOptional({type: String})
    @IsOptional()
    @IsString()
    readonly description: string;

    @ApiPropertyOptional({type: Boolean})
    @IsBoolean()
    readonly isFavorite: boolean;

    @ApiPropertyOptional({type: String})
    @IsOptional()
    @IsString()
    readonly background: string;
}
