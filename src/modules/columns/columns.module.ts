import {Module} from '@nestjs/common';
import {ColumnsController} from './columns.controller';
import {ColumnsService} from './columns.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Columns} from './models/columns';

@Module({
    imports: [TypeOrmModule.forFeature([Columns])],
    controllers: [ColumnsController],
    providers: [ColumnsService],
})

export class ColumnsModule {
}
