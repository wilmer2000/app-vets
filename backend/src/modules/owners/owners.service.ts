import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto.js';
import { UpdateOwnerDto } from './dto/update-owner.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Role } from '@prisma/client';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    try {
      const userExisted = await this.prisma.user.findUnique({
        where: { email: createOwnerDto.email },
      });

      if (userExisted) {
        throw new ConflictException('Email already registered');
      }

      return await this.prisma.user.create({
        data: {
          ...createOwnerDto,
          role: Role.OWNER,
        },
        omit: { password: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.user.findMany({
        where: { role: Role.OWNER },
        omit: { password: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, role: Role.OWNER },
        omit: { password: true },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    try {
      const userExisted = await this.prisma.user.findUnique({
        where: { id },
      });

      if (!userExisted) {
        throw new NotFoundException(
          `User with email ${updateOwnerDto.email} not found`,
        );
      }

      return await this.prisma.user.update({
        where: { id },
        data: { ...updateOwnerDto, role: Role.OWNER },
        omit: { password: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id, role: Role.OWNER },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
