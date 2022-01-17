import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

@Entity()
export class Board {
    @ApiPropertyOptional({type: Number})
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    title: string;

    @ApiPropertyOptional({type: String})
    @Column('text', {})
    description: string;

    @ApiPropertyOptional({type: Boolean})
    @Column('boolean', {})
    isFavorite: boolean;

    @ApiPropertyOptional({type: String})
    @Column('text', {})
    background: string;
}
