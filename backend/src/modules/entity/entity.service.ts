import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateEntityDto } from './dto/create-entity.dto.js';
import { UpdateEntityDto } from './dto/update-entity.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { Entity, Prisma } from '../../../prisma/generated/prisma/client.js';

@Injectable()
export class EntityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEntityDto): Promise<Partial<Entity>> {
    try {
      return await this.prisma.entity.create({
        data: {
          ...dto,
          isActive: dto.isActive ?? false,
          contact: dto.contact ? { create: dto.contact } : Prisma.skip,
          address: dto.address ? { create: dto.address } : Prisma.skip,
        },
        include: {
          address: true,
          contact: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<Partial<Entity[]>> {
    try {
      return await this.prisma.entity.findMany({
        include: {
          clients: true,
          staff: true,
          services: true,
          appointments: true,
          contact: true,
          address: true,
          configuration: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(entityId: string): Promise<Partial<Entity>> {
    try {
      return await this.prisma.entity.findUniqueOrThrow({
        where: { entityId },
        include: {
          clients: true,
          staff: true,
          services: true,
          appointments: true,
          contact: true,
          address: true,
          configuration: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    entityId: string,
    dto: UpdateEntityDto,
  ): Promise<Partial<Entity>> {
    try {
      return await this.prisma.entity.update({
        where: { entityId },
        data: {
          ...dto,
          contact: dto.contact
            ? {
                upsert: {
                  create: dto.contact,
                  update: dto.contact,
                },
              }
            : Prisma.skip,
          address: dto.address
            ? {
                upsert: {
                  create: dto.address,
                  update: dto.address,
                },
              }
            : Prisma.skip,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(entityId: string): Promise<string> {
    try {
      await this.prisma.entity.delete({
        where: { entityId },
      });
      return `Entity with id ${entityId} has been deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
