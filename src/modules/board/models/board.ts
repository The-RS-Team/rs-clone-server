import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

@Entity()
export class Board {
    @ApiPropertyOptional({type: Number})
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public title: string;

    @ApiPropertyOptional({type: String})
    @Column('text', {})
    public description: string;

    @ApiPropertyOptional({type: Boolean})
    @Column('boolean', {})
    public isFavorite: boolean;

    @ApiPropertyOptional({type: String})
    @Column('text', {})
    public background: string;
}
