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
import { UserService } from '../user/user.service.js';
import { UpdateUserDto } from '../user/dtos/update-user.dto.js';
import { PasswordResetDto } from './dtos/password-reset.dto.js';
import { PasswordChangeDto } from './dtos/password-change.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private emailService: EmailService,
    private userService: UserService,
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

  async resetPassword(dto: PasswordResetDto): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException(`Email does not exist`);
      }

      const randomPassword =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      const id = user.id;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(randomPassword, salt);
      const updatedPassword = {
        password: hash,
      } as UpdateUserDto;

      await this.userService.update(id, updatedPassword);

      const to = user.email;
      const subject = 'Password Reset Request';
      const text = 'Please click on the link to reset your password';
      return await this.emailService.sendEmail(to, subject, text);
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async changePassword(dto: PasswordChangeDto): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (!user) {
        throw new NotFoundException(`Email does not exist`);
      }

      const id = user.id;
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(dto.password, salt);
      const updatedPassword = {
        password: hash,
      } as UpdateUserDto;

      await this.userService.update(id, updatedPassword);

      const to = user.email;
      const subject = 'Password changed';
      const text = 'Password has been changed successfully';

      return await this.emailService.sendEmail(to, subject, text);
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
