import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

@Entity('card')
export class CardEntity {
    @ApiPropertyOptional({type: Number})
    @PrimaryGeneratedColumn('increment')
    public id: number;

    // @ManyToOne(() => Board, board => board.id, {onDelete: 'CASCADE'})
    // board: Board;

    @ApiPropertyOptional({type: String})
    @Column('varchar', {nullable: false,})
    @IsNotEmpty()
    public title: string;

    @ApiPropertyOptional({type: Number})
    @Column('integer', {nullable: false,})
    @IsNotEmpty()
    public position: number;
}
