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

  create(createBreedDto: CreateBreedDto) {
    try {
      return this.prisma.breed.create({ data: createBreedDto });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findAll() {
    try {
      return this.prisma.breed.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: string) {
    try {
      const breed = this.prisma.breed.findUnique({ where: { id } });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }

      return breed;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  update(id: string, updateBreedDto: UpdateBreedDto) {
    try {
      const breed = this.prisma.breed.findUnique({ where: { id } });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }

      return this.prisma.breed.update({
        where: { id },
        data: updateBreedDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: string) {
    try {
      const breed = this.prisma.breed.findUnique({ where: { id } });

      if (!breed) {
        throw new NotFoundException(`Breed with ID ${id} not found`);
      }

      return this.prisma.breed.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
