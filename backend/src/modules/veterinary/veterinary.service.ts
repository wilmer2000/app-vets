import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto.js';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { QueryVeterinaryDto } from './dto/query-veterinary.dto.js';

@Injectable()
export class VeterinaryService {
  constructor(private prisma: PrismaService) {}
  async create(createVeterinaryDto: CreateVeterinaryDto) {
    try {
      return await this.prisma.veterinary.create({
        data: {
          ...createVeterinaryDto,
          isActive: false,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(query: QueryVeterinaryDto) {
    try {
      return await this.prisma.veterinary.findMany({
        where: query,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const veterinary = await this.prisma.veterinary.findUnique({
        where: { id },
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
