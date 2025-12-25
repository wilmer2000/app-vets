import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service.js';
import { LoginUserDto } from '../dtos/login-user.dto.js';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const loginUserDto: LoginUserDto = { email, password };
    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
