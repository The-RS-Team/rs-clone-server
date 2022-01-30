import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FileEntity} from './models/files';
import {FilesController} from './files.controller';
import {FilesService} from './files.service';

@Module({
    imports: [TypeOrmModule.forFeature([FileEntity])],
    controllers: [FilesController,],
    providers: [FilesService],
})

export class FilesModule {
}
