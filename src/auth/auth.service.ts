import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {
  }

  async login(req: Request): Promise<string> {
    console.log('AuthService:', req['user']);
    return req['user'];
  }
}
