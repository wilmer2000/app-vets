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
import { QueryUserDto } from './dtos/query-user.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto): Promise<Partial<User>> {
    try {
      const role = dto.role ?? Role.USER;
      const hasPassword = !!dto.password;

      if (hasPassword) {
        const salt: string = await bcrypt.genSalt(10);
        dto.password = await bcrypt.hash(dto.password, salt);
      }

      return await this.prisma.user.create({
        data: {
          ...dto,
          role,
          password: hasPassword ? dto.password : null,
          isActive: dto.isActive ?? false,
          contact: dto.contact ? { create: dto.contact } : Prisma.skip,
          address: dto.address ? { create: dto.address } : Prisma.skip,
        },
        omit: { password: true },
        include: {
          address: true,
          contact: true,
        },
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

  async findAll(query: QueryUserDto): Promise<Partial<User>[]> {
    const where: Partial<Prisma.UserWhereInput> = {};
    Object.keys(query).forEach((key) => {
      where[key] = (query && query[key as keyof QueryUserDto]) ?? Prisma.skip;
    });

    try {
      return await this.prisma.user.findMany({
        omit: { password: true },
        where,
        include: {
          address: true,
          contact: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(userId: string): Promise<Partial<User>> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { userId },
        omit: { password: true },
        include: {
          contact: true,
          address: true,
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async update(userId: string, dto: UpdateUserDto): Promise<Partial<User>> {
    try {
      return await this.prisma.user.update({
        where: { userId },
        include: { address: true },
        data: {
          ...dto,
          contact: dto.contact
            ? {
                upsert: {
                  create: dto.contact,
                  update: dto.contact,
                },
              }
            : Prisma.skip,
          address: dto.address
            ? {
                upsert: {
                  create: dto.address,
                  update: dto.address,
                },
              }
            : Prisma.skip,
        },
        omit: { password: true },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async delete(userId: string): Promise<string> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { userId },
      });

      await this.prisma.user.delete({
        where: { userId },
      });

      return `User with id ${user.userId} deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
