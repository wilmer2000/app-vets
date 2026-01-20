import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateServiceDto) {
    const { entityId, ...serviceData } = dto;
    try {
      return await this.prisma.service.create({
        data: {
          ...serviceData,
          entity: { connect: { entityId } },
        },
        include: {
          entity: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.service.findMany();
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(serviceId: string) {
    try {
      return await this.prisma.service.findUniqueOrThrow({
        where: { serviceId },
        include: {
          entity: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(serviceId: string, updateServiceDto: UpdateServiceDto) {
    try {
      return await this.prisma.service.update({
        data: { ...updateServiceDto },
        where: { serviceId },
        include: {
          entity: true,
        },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(serviceId: string) {
    try {
      await this.prisma.service.delete({ where: { serviceId } });
      return `Service with id ${serviceId} has been deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
