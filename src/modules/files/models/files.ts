import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

@Entity('files')
export class FilesEntity {
    @ApiPropertyOptional({type: String})
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public originalname: string;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public encoding: string;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public mimetype: string;

    @ApiPropertyOptional({type: Number, nullable: false})
    @Column('integer', {nullable: false,})
    @IsNotEmpty()
    public size: number;

    @ApiPropertyOptional({type: 'bytea'})
    @Column('bytea', {})
    public data: Buffer;
}
