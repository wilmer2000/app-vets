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
          isActive: dto.isActive ?? false,
          profile: {
            create: {
              name: '',
              lastname: '',
              phone: '',
              address: {
                create: {
                  street: '',
                  city: '',
                  country: '',
                },
              },
            },
          },
        },
        omit: { password: true },
        include: {
          profile: {
            include: {
              address: true,
            },
          },
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
    try {
      return await this.prisma.user.findMany({
        omit: { password: true },
        where: query ?? {},
        include: {
          profile: {
            include: {
              address: true,
            },
          },
        },
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
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      return await this.prisma.user.update({
        where: { id },
        omit: { password: true },
        data: {
          role: updateUserDto.role,
          isActive: updateUserDto.isActive,
          profile: {
            update: {
              name: updateUserDto.name,
              lastname: updateUserDto.lastname,
              phone: updateUserDto.phone,
              address: {
                update: {
                  street: updateUserDto.street,
                  city: updateUserDto.city,
                  country: updateUserDto.country,
                },
              },
            },
          },
        },
        include: {
          profile: {
            include: {
              address: true,
            },
          },
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
