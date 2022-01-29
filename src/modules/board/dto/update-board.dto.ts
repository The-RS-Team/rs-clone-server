import {IS_UUID, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class UpdateBoardDto {
    @ApiPropertyOptional({type: String, nullable: false})
    @IsUUID()
    @IsNotEmpty()
    readonly id: string;

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
