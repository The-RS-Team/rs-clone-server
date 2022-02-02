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
    return this.filesEntityRepository.findOne(id);
  }

  async updateFile(filesEntity: FileEntity): Promise<UpdateResult> {
    const item = await this.filesEntityRepository.preload({
      id: filesEntity.id,
      ...filesEntity,
    });
    if (!item) {
      throw new NotFoundException(`Item ${filesEntity.id} not found`);
    }
    return this.filesEntityRepository.update(item.id, item);
  }

  async create(createFilesDto: CreateFilesDto): Promise<FileEntity> {
    const item = this.filesEntityRepository.create(createFilesDto);
    return this.filesEntityRepository.save(item);
  }

  async deleteFile(id: string): Promise<DeleteResult> {
    return this.filesEntityRepository.delete(id);
  }
}




