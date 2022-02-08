import { Controller, Get, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from '../app.constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Public()
  @Get('/login')
  @ApiCreatedResponse({ description: 'User login successfully.' })
  @ApiUnprocessableEntityResponse({ description: 'Access Denied.' })
  async login(@Req() request) {
    return this.authService.login(request);
  }

}
