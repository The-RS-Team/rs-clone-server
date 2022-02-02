import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsString, Min} from 'class-validator';

export class CreateFilesDto {
    @ApiPropertyOptional({type: String, nullable: true})
    @IsString()
    @IsNotEmpty()
    public originalname: string;

    @ApiPropertyOptional({type: Number, nullable: false})
    @Min(0)
    @IsNotEmpty()
    public size: number;

    @ApiPropertyOptional({type: String, nullable: false})
    @IsString()
    @IsNotEmpty()
    public mimetype: string;

    @ApiPropertyOptional({type: String, nullable: true})
    @IsString()
    public encoding: string;

    @ApiPropertyOptional({type: 'bytea', nullable: true})
    public buffer: Buffer;

    @ApiPropertyOptional({type: String, nullable: false})
    @IsString()
    @IsNotEmpty()
    public cardId: string;
}




