import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserEntity } from '../modules/users/models/users';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Post('/login')
  @ApiCreatedResponse({ description: 'User login successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Access Denied.' })
  async login(@Body() user: UserEntity) {
    return this.authService.login(user);
  }

}
