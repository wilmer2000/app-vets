import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto.js';
import { UpdateBreedDto } from './dto/update-breed.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class BreedService {
  constructor(private prisma: PrismaService) {}

  async create(createBreedDto: CreateBreedDto) {
    try {
      return await this.prisma.breed.create({ data: createBreedDto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.breed.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const breed = await this.prisma.breed.findUnique({ where: { id } });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }

      return breed;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateBreedDto: UpdateBreedDto) {
    try {
      const breed = await this.prisma.breed.findUnique({ where: { id } });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }

      return await this.prisma.breed.update({
        where: { id },
        data: updateBreedDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const breed = await this.prisma.breed.findUnique({ where: { id } });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }

      return await this.prisma.breed.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
