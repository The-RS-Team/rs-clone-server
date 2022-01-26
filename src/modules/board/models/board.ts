import {Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {ColumnEntity} from '../../columns/models/column';

@Entity('board')
export class BoardEntity {
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

    @OneToMany(() => ColumnEntity, column => column.board)
    @JoinTable()
    public columns: ColumnEntity[];
}
