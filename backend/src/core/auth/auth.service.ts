import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto.js';
import {
  LoginResponse,
  UserPayload,
} from './interfaces/users-login.interface.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { User } from '../../../prisma/generated/prisma/client.js';
import { EmailService } from '../services/email.service.js';
import { PasswordChangeDto } from './dtos/password-change.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const user = await this.validateUserAndPassword(loginUserDto);
      const payload: UserPayload = {
        sub: user.userId,
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

  async changePassword(dto: PasswordChangeDto): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException(`Email does not exist`);
      }

      const userId = user.userId;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(dto.password, salt);

      await this.prisma.user.update({
        where: { userId },
        data: { password: hash },
      });

      const to = user.email;
      const subject = 'Password changed';
      const text = 'Password has been changed successfully';

      return await this.emailService.sendEmail(to, subject, text);
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
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
