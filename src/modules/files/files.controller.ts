import {Controller, Delete, Get, Param, ParseUUIDPipe, Post, UploadedFile, UseInterceptors,} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {Express} from 'express';
import {FilesService} from './files.service';
import {ApiBody, ApiConsumes, ApiNotFoundResponse, ApiOkResponse, ApiProperty} from '@nestjs/swagger';
import {CreateFilesDto} from './dto/create-files.dto';
import {FilesEntity} from './models/files';
import {DeleteResult} from 'typeorm';

@Controller('file')
export class FilesController {
    constructor(private readonly filesService: FilesService) {
    }

    @Get('/all')
    @ApiOkResponse({description: 'Files retrieved successfully.'})
    @ApiProperty({default: [], isArray: true})
    async getFiles(): Promise<FilesEntity[]> {
        return this.filesService.getFiles();
    }

    @Get('/id/:id')
    @ApiOkResponse({description: 'Files retrieved successfully.'})
    @ApiProperty({default: [], isArray: true})
    async getFile(@Param('id', ParseUUIDPipe) id: string): Promise<FilesEntity> {
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
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
        if (file) {
            const fileDto = new CreateFilesDto(file);
            return this.filesService.create(fileDto).then(fileEntity => JSON.stringify({id: fileEntity.id}));
        }
    }

    @Delete(':id')
    @ApiOkResponse({description: 'Post deleted successfully.'})
    @ApiNotFoundResponse({description: 'Post not found.'})
    public delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
        return this.filesService.deleteFile(id);
    }
}
