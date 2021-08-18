/* eslint-disable prettier/prettier */
import { UseGuards, Request, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service'
import { ApiController } from 'common/decorator';

@ApiController("auth")
export class AuthController {
  constructor(private usersService: UsersService, private authService: AuthService) { }

  @UsePipes(ValidationPipe)
  @Post('register')
  async register(@Body(new ValidationPipe({ transform: true })) registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body(new ValidationPipe({ transform: true })) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
