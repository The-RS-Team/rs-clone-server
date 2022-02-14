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

  getUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  getUser(id: string): Promise<UserEntity> {
    return this.usersRepository.findOneOrFail(id);
  }

  async updateUser(user: UpdateUserDto): Promise<UpdateResult> {
    const item = await this.usersRepository.preload({ user_id: user.user_id, ...user });
    if (!item) {
      throw new NotFoundException(`Item ${user.user_id} not found`);
    }
    return this.usersRepository.update(item.user_id, item);
  }

  create(user: CreateUserDto): Promise<UserEntity> {
    const item = this.usersRepository.merge(user);
    return this.usersRepository.save(item);
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
