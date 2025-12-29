import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { CreateUserDto } from './dtos/create-user.dto.js';
import { Prisma, User } from '../../../prisma/generated/prisma/client.js';
import { UpdateUserDto } from './dtos/update-user.dto.js';
import { Role } from '@prisma/client';
import { UserQueryDto } from './dtos/user-query.dto.js';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    try {
      return await this.prisma.user.create({
        data: { ...createUserDto, role: createUserDto.role ?? Role.USER },
        omit: { password: true },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Email already registered');
      }

      throw new InternalServerErrorException(error);
    }
  }

  async findAll(query: UserQueryDto): Promise<Partial<User>[]> {
    console.log(query);
    try {
      return await this.prisma.user.findMany({
        omit: { password: true },
        where: query,
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string): Promise<Partial<User>> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
        omit: { password: true },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<User>> {
    try {
      await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      return await this.prisma.user.update({
        where: { id },
        omit: { password: true },
        data: updateUserDto,
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

      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<string> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.user.delete({
        where: { id },
      });

      return `User with id ${user.id} deleted`;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      throw new InternalServerErrorException(error);
    }
  }
}
