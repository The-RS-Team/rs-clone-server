import {Module} from '@nestjs/common';
import {ColumnController} from './column.controller';
import {ColumnService} from './column.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ColumnEntity} from './models/column';

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity])],
    controllers: [ColumnController],
    providers: [ColumnService],
})

export class ColumnModule {
}
