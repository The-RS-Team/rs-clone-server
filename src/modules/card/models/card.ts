import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {ColumnEntity} from '../../columns/models/column';

@Entity('card')
export class CardEntity {
    @ApiPropertyOptional({type: Number})
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @ManyToOne(() => ColumnEntity, column => column.cards, {onDelete: 'CASCADE', nullable: false})
    public column: ColumnEntity;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public title: string;

    @ApiPropertyOptional({type: Number})
    @Column('integer', {nullable: false,})
    @IsNotEmpty()
    public position: number;
}
