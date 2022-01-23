import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Columns} from './models/columns';
import {DeleteResult, Repository, UpdateResult} from 'typeorm';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(Columns)
        private readonly columnsRepository: Repository<Columns>) {
    }

    async getColumns(): Promise<Columns[]> {
        return this.columnsRepository.find();
    }

    async getColumn(id: number): Promise<Columns> {
        return this.columnsRepository.findOne(id);
    }

    async updateColumn(column: Columns): Promise<UpdateResult> {
        return this.columnsRepository.update(column.id, column);
    }

    async create(column: Columns): Promise<Columns> {
        this.columnsRepository.save(column);
        return column;
    }

    async deleteColumn(id: number): Promise<DeleteResult> {
        return this.columnsRepository.delete(id);
    }
}

