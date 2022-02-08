import { Controller, Delete, Get, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { CreateFilesDto } from './dto/create-files.dto';
import { FileEntity } from './models/files';
import { DeleteResult } from 'typeorm';

@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {
  }

  @Get('/all/:cardId')
  @ApiOkResponse({ description: 'Files retrieved successfully.' })
  @ApiProperty({ default: [], isArray: true })
  async getFiles(@Param('cardId', ParseUUIDPipe) cardId: string): Promise<FileEntity[]> {
    return this.filesService.getFiles(cardId);
  }

  @Get('/id/:id')
  @ApiOkResponse({ description: 'Files retrieved successfully.' })
  @ApiProperty({ default: [], isArray: true })
  async getFile(@Param('id', ParseUUIDPipe) id: string): Promise<FileEntity> {
    return this.filesService.getFile(id);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload/:cardid')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param('cardid', ParseUUIDPipe) cardid: string, @UploadedFile() file: CreateFilesDto): Promise<string> {
    if (file) {
      file.cardId = cardid;
      return this.filesService.create(file).then(fileEntity => JSON.stringify({ id: fileEntity.id }));
    }
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.filesService.deleteFile(id);
  }
}
