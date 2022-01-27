import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

@Entity('files')
export class ColumnEntity {
    @ApiPropertyOptional({type: Number})
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public title: string;

    @ApiPropertyOptional({type: Number})
    @Column('integer', {nullable: false,})
    @IsNotEmpty()
    public position: number;

    @ApiPropertyOptional({type: String})
    @Column('text', {})
    public description: string;

}
