import { Body, Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ required: true })
  async login(@Res() response, @Body() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
