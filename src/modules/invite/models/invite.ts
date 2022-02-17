import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

@Entity('invite')
export class InviteEntity {
  @ApiPropertyOptional({ type: String })
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('varchar', { nullable: false })
  @IsNotEmpty()
  public email: string;

  @ApiPropertyOptional({ type: String, nullable: false })
  @Column('uuid', { nullable: true })
  public boardId: string;

  @CreateDateColumn({ nullable: false })
  public expireDate: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.expireDate = this.addDays(new Date(), 5);
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}
