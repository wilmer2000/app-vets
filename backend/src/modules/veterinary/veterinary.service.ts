import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateVeterinaryDto } from './dto/create-veterinary.dto.js';
import { UpdateVeterinaryDto } from './dto/update-veterinary.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class VeterinaryService {
  constructor(private prisma: PrismaService) {}
  async create(createVeterinaryDto: CreateVeterinaryDto) {
    try {
      return await this.prisma.veterinary.create({
        data: {
          ...createVeterinaryDto,
          isActive: false
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateVeterinaryDto: UpdateVeterinaryDto) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
