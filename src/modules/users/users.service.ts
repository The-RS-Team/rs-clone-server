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
    return await this.usersRepository.find();
  }

  async getUser(id: string): Promise<UserEntity> {
    return await this.usersRepository.findOne(id);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.findOne({
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
      try {
        return await this.usersRepository.save(user);
      } catch {
        return item;
      }
    }
  }

  async deleteUser(id: string): Promise<DeleteResult> {
    return await this.usersRepository.delete(id);
  }
}
