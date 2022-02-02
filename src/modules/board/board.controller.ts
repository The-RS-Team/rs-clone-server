import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from './models/board';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {
  }

  @Get('/all')
  @ApiOkResponse({ description: 'Boards retrieved successfully.' })
  @ApiProperty({ default: [], isArray: true })
  async getBoards(): Promise<BoardEntity[]> {
    return this.boardService.getBoards();
  }

  @Get('/id/:id')
  @ApiOkResponse({ description: 'Board retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Board not found.' })
  async getBoardById(@Param('id', ParseUUIDPipe) id: string): Promise<BoardEntity> {
    return this.boardService.getBoard(id);
  }

  @Get('/fav')
  @ApiOkResponse({ description: 'Favorite boards retrieved successfully.' })
  async getBoardsFavorite(): Promise<BoardEntity[]> {
    return this.boardService.getBoardsFavorite();
  }

  @Post()
  @ApiCreatedResponse({ description: 'Board created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Board title already exists.' })
  async create(@Body() board: CreateBoardDto): Promise<BoardEntity> {
    return this.boardService.create(board);
  }

  @Put()
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(@Body() board: UpdateBoardDto): Promise<UpdateResult> {
    return this.boardService.updateBoard(board);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.boardService.deleteBoard(id);
  }
}
