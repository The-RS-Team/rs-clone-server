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

  async getFiles(cardId: string): Promise<FileEntity[]> {
    return await this.filesEntityRepository
      .createQueryBuilder('file')
      .select('file.id')
      .addSelect('file.originalname')
      .addSelect('file.encoding')
      .addSelect('file.mimetype')
      .addSelect('file.size')
      .addSelect('file.cardId')
      .addSelect('file.buffer')
      .where('file.cardId = :cardId', { cardId: cardId })
      .getMany();
  }

  async getFile(id: string): Promise<FileEntity> {
    return this.filesEntityRepository.findOneOrFail(id);
  }

  async updateFile(filesEntity: FileEntity): Promise<UpdateResult> {
    const item = await this.filesEntityRepository.preload({ id: filesEntity.id, ...filesEntity });
    if (!item) {
      throw new NotFoundException(`Item ${filesEntity.id} not found`);
    }
    return this.filesEntityRepository.update(item.id, item);
  }

  async create(createFilesDto: CreateFilesDto): Promise<FileEntity> {
    try {
      const item = this.filesEntityRepository.create(createFilesDto);
      return this.filesEntityRepository.save(item);
    } catch (e) {
      console.log('createFiles: ', e);
    }
  }

  async deleteFile(id: string): Promise<DeleteResult> {
    const deleteResultNode = await this.filesEntityRepository.delete(id);
    if (deleteResultNode.affected > 0) {
      deleteResultNode.raw.push(id);
    }
    return deleteResultNode;
  }
}




