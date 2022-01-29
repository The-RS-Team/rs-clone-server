import {Injectable, NotFoundException} from '@nestjs/common';
import {FilesEntity} from './models/files';
import {InjectRepository} from '@nestjs/typeorm';
import {Column, DeleteResult, Repository, UpdateResult} from 'typeorm';
import {CreateFilesDto} from './dto/create-files.dto';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(FilesEntity)
        private readonly filesEntityRepository: Repository<FilesEntity>) {
    }

    async getFiles(): Promise<FilesEntity[]> {
        return await this.filesEntityRepository
            .createQueryBuilder('files')
            .select('files.id')
            .addSelect('files.originalname')
            .addSelect('files.encoding')
            .addSelect('files.mimetype')
            .addSelect('files.size')
            .getMany();
    }

    async getFile(id: string): Promise<FilesEntity> {
        return this.filesEntityRepository.findOne(id);
    }

    async updateFile(filesEntity: FilesEntity): Promise<UpdateResult> {
        const item = await this.filesEntityRepository.preload({
            id: filesEntity.id,
            ...filesEntity,
        });
        if (!item) {
            throw new NotFoundException(`Item ${filesEntity.id} not found`);
        }
        return this.filesEntityRepository.update(item.id, item);
    }

    async create(createFilesDto: CreateFilesDto): Promise<FilesEntity> {
        const item = this.filesEntityRepository.create(createFilesDto);
        return this.filesEntityRepository.save(item);
    }

    async deleteFile(id: string): Promise<DeleteResult> {
        return this.filesEntityRepository.delete(id);
    }
}




