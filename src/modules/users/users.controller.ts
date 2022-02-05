import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiProperty,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UsersService } from './users.service';
import { UserEntity } from './models/user';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {
  }

  @Get('/all')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Users retrieved successfully.' })
  @ApiProperty({ default: [], isArray: true })
  async getUsers(): Promise<UserEntity[]> {
    return this.usersService.getUsers();
  }

  @Get('/id/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  async getUserById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return this.usersService.getUser(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User created successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'User already exists.' })
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(user);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Post already exists.' })
  public update(@Body() user: UpdateUserDto): Promise<UpdateResult> {
    return this.usersService.updateUser(user);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User not found.' })
  public delete(@Param('id', ParseUUIDPipe) id: string): Promise<DeleteResult> {
    return this.usersService.deleteUser(id);
  }
}
