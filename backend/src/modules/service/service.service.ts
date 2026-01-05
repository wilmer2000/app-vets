import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto.js';
import { UpdateServiceDto } from './dto/update-service.dto.js';
import { PrismaService } from '../../../prisma/prisma.service.js';
import { VeterinaryWhereUniqueInput } from '../../../prisma/generated/prisma/models/Veterinary.js';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateServiceDto) {
    try {
      const type = dto.type;
      const name = dto.name;
      const price = dto.price;
      const isActive = dto.isActive ?? false;
      const veterinaryId = {
        id: dto.veterinaryId,
      } as VeterinaryWhereUniqueInput;

      return await this.prisma.service.create({
        data: {
          type,
          name,
          isActive,
          price,
          veterinary: { connect: veterinaryId },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.service.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: string) {
    try {
      const service = await this.prisma.service.findUnique({ where: { id } });

      if (!service) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }

      return service;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    try {
      const service = await this.prisma.service.findUnique({ where: { id } });

      if (!service) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }

      return await this.prisma.service.update({
        where: { id },
        data: { ...updateServiceDto },
        omit: { veterinaryId: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: string) {
    try {
      const service = await this.prisma.service.findUnique({ where: { id } });

      if (!service) {
        throw new NotFoundException(`Service with ID ${id} not found`);
      }

      return await this.prisma.service.delete({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
