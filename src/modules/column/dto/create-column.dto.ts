import {IsInt, IsNotEmpty, IsOptional, IsString, Min} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class CreateColumnDto {
    @ApiPropertyOptional({type: String, nullable: false})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiPropertyOptional({type: String, nullable: false})
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    readonly boardId: string;

    @ApiPropertyOptional({type: Number})
    @IsInt()
    @Min(0)
    readonly position: number;

    @ApiPropertyOptional({type: String})
    @IsOptional()
    @IsString()
    readonly description: string;
}
