import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto.js';
import { UpdatePetDto } from './dto/update-pet.dto.js';
import { Pet } from '@prisma/client';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Prisma } from '../../../prisma/generated/prisma/client.js';
import { QueryPetDto } from './dto/query-pet.dto.js';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePetDto): Promise<Partial<Pet>> {
    const { clientId, ...petData } = dto;

    try {
      return await this.prisma.pet.create({
        data: {
          ...petData,
          client: {
            connect: { clientId },
          },
        },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${dto.clientId} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(query: QueryPetDto): Promise<Partial<Pet>[]> {
    const where: Partial<Prisma.PetWhereInput> = {};
    Object.keys(query).forEach((key) => {
      where[key] = (query && query[key as keyof QueryPetDto]) ?? Prisma.skip;
    });

    try {
      return await this.prisma.pet.findMany({
        where,
        include: { client: true },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(petId: string): Promise<Partial<Pet>> {
    try {
      return await this.prisma.pet.findUniqueOrThrow({
        where: { petId },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(petId: string, dto: UpdatePetDto): Promise<Partial<Pet>> {
    try {
      return await this.prisma.pet.update({
        where: { petId },
        data: dto,
        include: { client: true },
      });
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Pet with id ${petId} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }

  async remove(petId: string): Promise<string> {
    try {
      await this.prisma.pet.delete({ where: { petId } });
      return `Pet with id ${petId} deleted`;
    } catch (error: unknown) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Pet with id ${petId} not found`);
      }
      throw new InternalServerErrorException(error);
    }
  }
}
