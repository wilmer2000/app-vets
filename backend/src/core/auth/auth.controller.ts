import { AuthService } from './auth.service.js';
import { LoginResponse } from './interfaces/users-login.interface.js';
import { LoginUserDto } from './dtos/login-user.dto.js';
import { LocalAuthGuard } from './guards/local-auth.guard.js';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PasswordResetDto } from './dtos/password-reset.dto.js';
import { PasswordChangeDto } from './dtos/password-change.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponse> {
    return this.authService.login(loginUserDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: PasswordResetDto) {
    return this.authService.resetPassword(dto);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() dto: PasswordChangeDto) {
    return this.authService.changePassword(dto);
  }
}
