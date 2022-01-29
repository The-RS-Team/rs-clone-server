import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {FilesEntity} from './models/files';
import {FilesController} from './files.controller';
import {FilesService} from './files.service';

@Module({
    imports: [TypeOrmModule.forFeature([FilesEntity])],
    controllers: [FilesController,],
    providers: [FilesService],
})

export class FilesModule {
}
