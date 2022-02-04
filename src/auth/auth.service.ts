import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { UserEntity } from '../modules/users/models/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  async login(req: Request): Promise<string> {
    const user = new UserEntity();
    user.name = req['user'].name;
    user.email = req['user'].email;
    user.user_id = req['user'].user_id;
    user.picture = req['user'].picture;
    user.iss = req['user'].iss;
    user.aud = req['user'].aud;
    this.usersService.create(user);
    return req['user'];
  }
}
