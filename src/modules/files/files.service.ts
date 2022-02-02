import { Injectable, NotFoundException } from '@nestjs/common';
import { FileEntity } from './models/files';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateFilesDto } from './dto/create-files.dto';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly filesEntityRepository: Repository<FileEntity>) {
  }

  async getFiles(): Promise<FileEntity[]> {
    return await this.filesEntityRepository
      .createQueryBuilder('files')
      .select('files.id')
      .addSelect('files.originalname')
      .addSelect('files.encoding')
      .addSelect('files.mimetype')
      .addSelect('files.size')
      .addSelect('files.cardId')
      .getMany();
  }

  async getFile(id: string): Promise<FileEntity> {
    try {
      return this.filesEntityRepository.findOne(id);
    } catch (e) {
      throw new NotFoundException(`Item ${id} not found`);
    }
  }

  async updateFile(filesEntity: FileEntity): Promise<UpdateResult | Error> {
    try {
      const item = await this.filesEntityRepository.preload({
        id: filesEntity.id,
        ...filesEntity,
      });
      if (!item) {
        return new NotFoundException(`Item ${filesEntity.id} not found`);
      }
      return this.filesEntityRepository.update(item.id, item);
    } catch (e) {
      return new Error(e);
    }
  }

  async create(createFilesDto: CreateFilesDto): Promise<FileEntity | Error> {
    try {
      const item = this.filesEntityRepository.create(createFilesDto);
      return this.filesEntityRepository.save(item);
    } catch (e) {
      return new Error(e);
    }
  }

  async deleteFile(id: string): Promise<DeleteResult | Error> {
    try {
      return this.filesEntityRepository.delete(id);
    } catch (e) {
      return new Error(e);
    }
  }
}




