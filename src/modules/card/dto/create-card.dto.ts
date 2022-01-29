import {IsInt, IsNotEmpty, IsString, Min} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class CreateCardDto {
    @ApiPropertyOptional({type: String, nullable: false})
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @ApiPropertyOptional({type: String, nullable: false})
    @IsInt()
    @Min(0)
    @IsNotEmpty()
    readonly columnId: string;

    @ApiPropertyOptional({type: Number})
    @IsInt()
    @Min(0)
    readonly position: number;

    @ApiPropertyOptional({type: String, nullable: true})
    @IsString()
    readonly description: string;
}
