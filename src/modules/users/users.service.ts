import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './models/users';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>) {
  }

  async getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  async getUser(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }

  getUserByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async updateUser(user: UpdateUserDto): Promise<UpdateResult> {
    const item = await this.usersRepository.preload({ user_id: user.user_id, ...user });
    if (!item) {
      throw new NotFoundException(`Item ${user.user_id} not found`);
    }
    return this.usersRepository.update(item.user_id, item);
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const item = await this.getUser(user.user_id);
    if (!item) {
      return this.usersRepository.save(user);
    }
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
