import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './models/column';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { CardEntity } from '../card/models/card';

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
    return this.columnsRepository.findOneOrFail(id);
  }

  async updateColumn(column: UpdateColumnDto): Promise<ColumnEntity> {
    const updateResultNode = await this.columnsRepository.update(column.id, column);
    if (updateResultNode.affected > 0) {
      return this.getColumn(column.id);
    }
    return new ColumnEntity();
  }

  async create(column: CreateColumnDto): Promise<ColumnEntity> {
    const item = this.columnsRepository.create(column);
    return this.columnsRepository.save(item);
  }

  async deleteColumn(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.columnsRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}

