import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto.js';
import {
  LoginResponse,
  UserPayload,
} from './interfaces/users-login.interface.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { User } from '../../../prisma/generated/prisma/client.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const user = await this.validateUserAndPassword(loginUserDto);
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.validateUserAndPassword(loginUserDto);
    if (!user) {
      return null;
    }
    return user;
  }

  private async validateUserAndPassword(
    loginUserDto: LoginUserDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user || !user.email || !user.password) {
      throw new BadRequestException('User not found');
    }

    if (!(await compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
