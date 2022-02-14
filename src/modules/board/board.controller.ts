import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardEntity } from './models/board';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { UserEntity } from '../users/models/users';
import { CurrentUser } from '../../utils/decorators/user.decorator';
import { UsersToBoardsService } from '../userstoboards/userstoboards.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService,
              private readonly usersToBoardsService: UsersToBoardsService) {
  }

  @Get('/all')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Boards retrieved successfully.' })
  @ApiProperty({ default: [], isArray: true })
  async getBoards(@CurrentUser() user: UserEntity): Promise<BoardEntity[]> {
    return this.boardService.getBoards(user.user_id);
  }

  @Get('/id/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Board retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'Board not found.' })
  async getBoardById(@Param('id', ParseUUIDPipe) id: string): Promise<BoardEntity> {
    return this.boardService.getBoard(id);
  }

  @Get('/fav')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Favorite boards retrieved successfully.' })
  async getBoardsFavorite(@CurrentUser() user: UserEntity): Promise<BoardEntity[]> {
    return this.boardService.getBoardsFavorite(user.user_id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Board created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Board title already exists.' })
  async create(@Body() board: CreateBoardDto,
               @CurrentUser() user: UserEntity): Promise<BoardEntity> {
    const newBoard = await this.boardService.create(board);
    console.log('CreateBoard', user.user_id, newBoard.id);
    await this.usersToBoardsService.create(user, newBoard, true);
    return newBoard;
  }

  @Put()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post title already exists.' })
  public update(@Body() board: UpdateBoardDto,
                @CurrentUser() user: UserEntity): Promise<UpdateResult> {
    return this.boardService.updateBoard(board);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  public delete(@Param('id', ParseUUIDPipe) id: string,
                @CurrentUser() user: UserEntity): Promise<DeleteResult> {
    return this.boardService.deleteBoard(id);
  }
}
