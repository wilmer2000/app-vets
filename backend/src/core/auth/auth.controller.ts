import { AuthService } from './auth.service.js';
import { LoginResponse } from './interfaces/users-login.interface.js';
import { LoginUserDto } from './dtos/login-user.dto.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }
}
