import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOwnerDto } from './dto/create-owner.dto.js';
import { UpdateOwnerDto } from './dto/update-owner.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OwnersService {
  constructor(private prisma: PrismaService) {}

  async create(createOwnerDto: CreateOwnerDto) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(createOwnerDto.password, salt);

      return this.prisma.user.create({
        data: {
          ...createOwnerDto,
          password: hash,
          role: Role.OWNER,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.user.findMany({
        where: { role: Role.OWNER },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.user.findUniqueOrThrow({
        where: { id, role: Role.OWNER },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    try {
      return this.prisma.user.update({
        where: { id },
        data: { ...updateOwnerDto, role: Role.OWNER },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.user.delete({
        where: { id, role: Role.OWNER },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
