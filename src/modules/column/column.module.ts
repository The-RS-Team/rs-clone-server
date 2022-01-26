import {Module} from '@nestjs/common';
import {ColumnService} from './column.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ColumnEntity} from './models/column';

@Module({
    imports: [TypeOrmModule.forFeature([ColumnEntity])],
    providers: [ColumnService],
    exports: [ColumnService],
})

export class ColumnModule {
}
