import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './models/column';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>) {
  }

  async getColumns(): Promise<ColumnEntity[]> {
    return this.columnsRepository.find({ order: { position: 'ASC' } });
  }

  async getColumn(id: string): Promise<ColumnEntity> {
    return this.columnsRepository.findOne(id);
  }

  async updateColumn(column: UpdateColumnDto): Promise<UpdateResult> {
    const item = await this.columnsRepository.preload({
      id: column.id,
      ...column,
    });
    if (!item) {
      throw new NotFoundException(`Item ${column.id} not found`);
    }
    return this.columnsRepository.update(item.id, item);
  }

  async create(column: CreateColumnDto): Promise<ColumnEntity> {
    const item = this.columnsRepository.create(column);
    return this.columnsRepository.save(item);
  }

  async deleteColumn(id: string): Promise<DeleteResult> {
    return this.columnsRepository.delete(id);
  }
}

