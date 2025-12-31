import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto.js';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { QueryVeterinaryDto } from './dto/query-veterinary.dto.js';
import { QueryUserDto } from '../../core/user/dtos/query-user.dto.js';
import { Prisma } from '../../../prisma/generated/prisma/client.js';

@Injectable()
export class VeterinaryService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateVeterinaryDto) {
    try {
      return await this.prisma.veterinary.create({
        data: dto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(query: QueryVeterinaryDto) {
    const where = {};
    Object.keys(query).forEach((key) => {
      where[key] = (query && query[key as keyof QueryUserDto]) ?? Prisma.skip;
    });

    try {
      return await this.prisma.veterinary.findMany({
        where,
        include: { services: true, payments: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id },
        include: { services: true, payments: true },
      });

      if (!veterinary) {
        throw new NotFoundException(`Veterinary with ID ${id} not found`);
      }

      return veterinary;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateVeterinaryDto: UpdateVeterinaryDto) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id },
      });

      if (!veterinary) {
        throw new NotFoundException(`Veterinary with ID ${id} not found`);
      }

      return await this.prisma.veterinary.update({
        data: { ...updateVeterinaryDto },
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id },
      });

      if (!veterinary) {
        throw new NotFoundException(`Veterinary with ID ${id} not found`);
      }

      return await this.prisma.veterinary.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
