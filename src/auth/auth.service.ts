import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { UserEntity } from '../modules/users/models/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  private async validate(userEntity: UserEntity): Promise<UserEntity> {
    return await this.usersService.getUser(userEntity.user_id);
  }

  async login(user: UserEntity): Promise<string> {
    this.usersService.create(user);
    return new Promise((resolve) => {
      resolve(JSON.stringify(user));
    });
  }
}
