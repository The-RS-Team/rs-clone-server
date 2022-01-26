import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ColumnEntity} from './models/column';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class ColumnService {
    constructor(
        @InjectRepository(ColumnEntity)
        private readonly columnsRepository: Repository<ColumnEntity>) {
    }

    async getColumns(): Promise<ColumnEntity[]> {
        return this.columnsRepository.find({order: {position: 'ASC'}});
    }

    async getColumn(id: number): Promise<ColumnEntity> {
        return this.columnsRepository.findOne(id);
    }

    async updateColumn(column: ColumnEntity): Promise<UpdateResult> {
        return this.columnsRepository.update(column.id, column);
    }

    async create(column: ColumnEntity): Promise<ColumnEntity> {
        return this.columnsRepository.save(column);
    }

    async deleteColumn(id: number): Promise<DeleteResult> {
        return this.columnsRepository.delete(id);
    }
}

