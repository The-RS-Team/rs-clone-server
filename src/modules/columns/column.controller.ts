import {Controller} from '@nestjs/common';
import {ColumnService} from './column.service';

@Controller('columns')
export class ColumnController {
    constructor(private readonly columnsService: ColumnService) {
    }

}
