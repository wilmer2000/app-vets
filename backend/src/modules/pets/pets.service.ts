import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    try {
      return this.prisma.pet.create({
        data: { ...createPetDto },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return this.prisma.pet.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.pet.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    try {
      return this.prisma.pet.update({
        where: { id },
        data: { ...updatePetDto },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return this.prisma.pet.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
