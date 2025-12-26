import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class PetsService {
  constructor(private prisma: PrismaService) {}

  async create(createPetDto: CreatePetDto) {
    try {
      return await this.prisma.pet.create({
        data: { ...createPetDto },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.pet.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const pet = await this.prisma.pet.findUnique({
        where: { id },
      });

      if (!pet) {
        throw new NotFoundException(`Pet with ID ${id} not found`);
      }

      return pet;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    try {
      return await this.prisma.pet.update({
        where: { id },
        data: { ...updatePetDto },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.pet.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
