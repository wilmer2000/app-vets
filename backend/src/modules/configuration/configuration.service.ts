import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateConfigurationDto } from './dto/create-configuration.dto.js';
import { UpdateConfigurationDto } from './dto/update-configuration.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';

@Injectable()
export class ConfigurationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateConfigurationDto) {
    const { entityId, ...config } = dto;

    try {
      return await this.prisma.configuration.create({
        data: {
          ...config,
          entity: {
            connect: { entityId },
          },
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
      return await this.prisma.configuration.findMany();
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(configId: string) {
    try {
      return await this.prisma.configuration.findUniqueOrThrow({
        where: { configId },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(configId: string, dto: UpdateConfigurationDto) {
    try {
      return await this.prisma.configuration.update({
        data: { ...dto },
        where: { configId },
      });
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(configId: string) {
    try {
      await this.prisma.configuration.delete({
        where: { configId },
      });
      return `Configuration with id ${configId} deleted`;
    } catch (error: unknown) {
      throw new InternalServerErrorException(error);
    }
  }
}
