import {Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {ColumnEntity} from '../../column/models/column';
import {FileEntity} from '../../files/models/files';

@Entity('card')
export class CardEntity {
    @ApiPropertyOptional({type: String})
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @ApiPropertyOptional({type: String, nullable: false})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public columnId: string;

    @ApiPropertyOptional({type: String, nullable: false})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public title: string;

    @ApiPropertyOptional({type: String, nullable: true})
    @Column('varchar', {nullable: true,})
    @IsNotEmpty()
    public description: string;

    @ApiPropertyOptional({type: Number, nullable: false})
    @Column('integer', {nullable: false,})
    @IsNotEmpty()
    public position: number;

    @ManyToOne(() => ColumnEntity, column => column.cards, {onDelete: 'CASCADE', nullable: false})
    public column: ColumnEntity;

    @OneToMany(() => FileEntity, file => file.card, {eager: true})
    @JoinTable()
    public files: FileEntity[];
}
