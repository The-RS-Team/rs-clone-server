import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {BoardEntity} from '../../board/models/board';

@Entity('column')
export class ColumnEntity {
    @ApiPropertyOptional({type: Number})
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @ManyToOne(() => BoardEntity, board => board.id, {onDelete: 'CASCADE'})
    board: BoardEntity;

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
