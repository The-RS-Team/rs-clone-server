import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query} from '@nestjs/common';
import {BoardService} from './board.service';
import {Board} from './models/board.entity';
import {ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import {DeleteResult, UpdateResult} from 'typeorm';

@Controller('board')
export class BoardController {
    constructor(private readonly boardService: BoardService) {
    }

    @Get('/all')
    @ApiOkResponse({description: 'Boards retrieved successfully.'})
    async getBoards(): Promise<Board[]> {
        return this.boardService.getBoards();
    }

    @Get('/id/:id')
    @ApiOkResponse({description: 'Board retrieved successfully.'})
    @ApiNotFoundResponse({description: 'Board not found.'})
    async getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
        return this.boardService.getBoard(id);
    }

    @Get('/fav')
    @ApiOkResponse({description: 'Favorite boards retrieved successfully.'})
    async getBoardsFavorite(): Promise<Board[]> {
        return this.boardService.getBoardsFavorite();
    }

    @Post()
    @ApiCreatedResponse({description: 'Board created successfully.'})
    @ApiUnprocessableEntityResponse({description: 'Board title already exists.'})
    async create(@Body() board: Board): Promise<Board> {
        return this.boardService.create(board);
    }

    @Put(':id')
    @ApiOkResponse({description: 'Post updated successfully.'})
    @ApiNotFoundResponse({description: 'Post not found.'})
    @ApiUnprocessableEntityResponse({description: 'Post title already exists.'})
    public update(@Param('id', ParseIntPipe) id: number, @Body() board: Board): Promise<UpdateResult> {
        return this.boardService.updateBoard(id, board);
    }

    @Delete(':id')
    @ApiOkResponse({description: 'Post deleted successfully.'})
    @ApiNotFoundResponse({description: 'Post not found.'})
    public delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
        return this.boardService.deleteBoard(id);
    }


}
