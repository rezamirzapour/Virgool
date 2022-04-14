/* eslint-disable prettier/prettier */
import {
  UseGuards,
  Req,
  Res,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { ApiController } from 'src/common/decorator';
import { RegisterDto, LoginDto } from './dto';
import { AuthService } from './auth.service';
@ApiController('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(
    @Body(new ValidationPipe({ transform: true })) registerDto: RegisterDto,
  ) {
    return this.usersService.create(registerDto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res() res: Response, @Body() loginDto: LoginDto) {
    const result = await this.authService.login(req.user);
    return res
      .cookie('access_token', result.access_token, {
        httpOnly: true,
        secure: true,
      })
      .json(result);
  }
}
