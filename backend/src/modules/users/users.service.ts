import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { Prisma, User } from '../../../prisma/generated/prisma/client.js';
import * as bcrypt from 'bcrypt';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dtos/login-user.dto.js';
import {
  LoginResponse,
  UserPayload,
} from './interfaces/users-login.interface.js';
import { UpdateUsertDto } from './dtos/update-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createUserDto.password, salt);

      return await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: hash,
        },
        select: {
          email: true,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already registered');
      }

      throw new InternalServerErrorException();
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginUserDto.email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!(await compare(loginUserDto.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUsertDto,
  ): Promise<Partial<User>> {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      const salt = await bcrypt.genSalt(10);

      return await this.prisma.user.update({
        where: { id },
        omit: { password: true },
        data: {
          ...updateUserDto,
          ...(updateUserDto.password && {
            password: await bcrypt.hash(updateUserDto.password, salt),
          }),
        },
      });
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`User with id ${id} not found`);
        }

        if (error.code === 'P2002') {
          throw new ConflictException('Email already registered');
        }
      }

      throw new InternalServerErrorException();
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.user.delete({
        where: { id },
      });

      return `User with id ${user.id} deleted`;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      throw new InternalServerErrorException();
    }
  }
}
