import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { UserEntity } from '../modules/users/models/user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
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

    const payload = {
      name: user.name,
      user_id: user.user_id,
    };
    return new Promise((resolve) => {
      const token = { access_token: this.jwtService.sign(payload) };
      resolve(JSON.stringify(token));
    });


  }
}
